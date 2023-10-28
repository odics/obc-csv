import { useState, useMemo } from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindowF,
} from "@react-google-maps/api";
import "../../App.css";

const Map = ({
  csv,
  selectedLoc,
  setSelectedLoc,
  setActiveDataPoint,
  tempThreshold,
}) => {
  const formatDateTime = (unix_time) => {
    const formattedDate = new Date(unix_time * 1000);
    return formattedDate.toLocaleDateString();
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDbaGqBCOSAkWzNmFHXNZVzSAOfqbv_4uE",
  });

  const center = useMemo(() => ({ lat: 51.45, lng: -0.01 }), []);

  return !isLoaded ? (
    <Flex w="100%" h="50vh" align="center" justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <GoogleMap mapContainerClassName="map-container" zoom={10} center={center}>
      {csv.map((marker, index) => {
        if (marker.SCORE <= tempThreshold) {
          return (
            <MarkerF
              position={{
                lat: Number(marker.LATITUDE),
                lng: Number(marker.LONGITUDE),
              }}
              onClick={() => {
                setSelectedLoc(marker);
                console.log(marker);
              }}
            ></MarkerF>
          );
        }
      })}
      {selectedLoc && (
        <InfoWindowF
          position={{
            lat: Number(selectedLoc.LATITUDE),
            lng: Number(selectedLoc.LONGITUDE),
          }}
          onCloseClick={() => {
            setSelectedLoc(null);
            setActiveDataPoint(null);
          }}
        >
          <Flex gap="1rem">
            <Flex direction="column" w="max-content">
              <Flex>
                <Text fontWeight="bold">Date</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Position in yards</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">Temperature</Text>
              </Flex>
            </Flex>
            <Flex direction="column" w="max-content">
              <Flex>
                <Text>{formatDateTime(selectedLoc.UNIX_TIME)}</Text>
              </Flex>
              <Flex>
                <Text>{selectedLoc.POSITION_YARDS}</Text>
              </Flex>
              <Flex>
                <Text>{selectedLoc.SCORE}°C</Text>
              </Flex>
            </Flex>
          </Flex>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default Map;
