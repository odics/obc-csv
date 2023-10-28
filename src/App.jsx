// Styles
import "./App.css";

// UI Imports
import {
  Flex,
  Tooltip,
  Text,
  Button,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

// Custom components
import Map from "./components/map/Map";
import TempSlider from "./components/slider/Slider";
import Slider from "./components/slider/Slider";
import DataRow from "./components/datarow/DataRow";

// Data
import csv from "./data/ta_exceedences.csv";

// Hooks
import { useState } from "react";
import useDateSort from "./Hooks/useDateSort";
import useIdSort from "./Hooks/useIdSort";
import usePositionSort from "./Hooks/usePositionSort";
import useScoreSort from "./Hooks/useScoreSort";

// Utility functions
import {
  sortDates,
  sortId,
  sortPosition,
  sortScore,
} from "./utils/sortingFunctions";

function App() {
  const unsortedData = csv;

  const { dateSortDirection, dateChangeDirection } = useDateSort();
  const { idSortDirection, idChangeDirection } = useIdSort();
  const { positionSortDirection, positionChangeDirection } = usePositionSort();
  const { scoreSortDirection, scoreChangeDirection } = useScoreSort();

  const [displayData, setDisplayData] = useState(csv);
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [activeDataPoint, setActiveDataPoint] = useState(null);
  const [tempThreshold, setTempThreshold] = useState(80);

  return (
    <Flex p="2rem" gap="2rem" w="100%">
      <Flex
        direction="column"
        gap="1rem"
        scrollBehavior="auto"
        h="100vh"
        w="100%"
        overflowX="auto"
        border="1px"
        borderColor="gray.300"
        padding="1rem"
        borderRadius="md"
      >
        <Flex
          gap="2rem"
          w="100%"
          border="1px"
          padding=".5rem"
          borderRadius="md"
        >
          <Flex
            minW="90px"
            align="center"
            gap="1rem"
            onClick={() => {
              setDisplayData(sortDates(unsortedData, dateSortDirection));
              dateChangeDirection();
            }}
            cursor="pointer"
          >
            <Text fontWeight="bold">Date</Text>
            {dateSortDirection === 1 ? <AiFillCaretDown /> : <AiFillCaretUp />}
          </Flex>
          <Flex minW="192px">
            <Text fontWeight="bold">Asset Name</Text>
          </Flex>
          <Flex
            minW="60px"
            align="center"
            gap="1rem"
            cursor="pointer"
            onClick={() => {
              setDisplayData(sortId(unsortedData, idSortDirection));
              idChangeDirection();
            }}
          >
            <Text fontWeight="bold">ID</Text>
            {idSortDirection === 1 ? <AiFillCaretDown /> : <AiFillCaretUp />}
          </Flex>
          <Flex
            minW="48px"
            align="center"
            gap="1rem"
            cursor="pointer"
            onClick={() => {
              setDisplayData(sortPosition(unsortedData, positionSortDirection));
              positionChangeDirection();
            }}
          >
            <Text fontWeight="bold">Pos.</Text>
            {positionSortDirection === 1 ? (
              <AiFillCaretDown />
            ) : (
              <AiFillCaretUp />
            )}
          </Flex>
          <Flex minW="90px">
            <Text fontWeight="bold">Latitude</Text>
          </Flex>
          <Flex minW="90px">
            <Text fontWeight="bold">Longitude</Text>
          </Flex>
          <Flex
            gap="1rem"
            align="center"
            cursor="pointer"
            onClick={() => {
              setDisplayData(sortScore(unsortedData, scoreSortDirection));
              scoreChangeDirection();
            }}
          >
            <Text fontWeight="bold">Score</Text>
            {scoreSortDirection === 1 ? <AiFillCaretDown /> : <AiFillCaretUp />}
          </Flex>
        </Flex>
        {displayData.map((item, index) => {
          let color;
          if (item.SCORE > 10 && item.SCORE <= 50) {
            color = "red.100";
          } else if (item.SCORE > 50 && item.SCORE < 70) {
            color = "red.200";
          } else if (item.SCORE >= 70 && item.SCORE < 80) {
            color = "red.300";
          } else {
            color = "red.600";
          }
          if (item.SCORE <= tempThreshold) {
            return (
              <DataRow
                setActiveDataPoint={setActiveDataPoint}
                activeDataPoint={activeDataPoint}
                setSelectedLoc={setSelectedLoc}
                item={item}
                time={item.UNIX_TIME}
                asset_name={item.ASSET_NAME}
                recording_id={item.RECORDING_ID}
                position_yards={item.POSITION_YARDS}
                latitude={item.LATITUDE}
                longitude={item.LONGITUDE}
                score={item.SCORE}
                index={index}
                color={color}
              />
            );
          }
        })}
      </Flex>
      <Flex
        direction="column"
        w={{ base: "30%", md: "40%", "2xl": "40%" }}
        gap="2rem"
        right="2rem"
      >
        <Map
          csv={csv}
          selectedLoc={selectedLoc}
          setSelectedLoc={setSelectedLoc}
          setActiveDataPoint={setActiveDataPoint}
          tempThreshold={tempThreshold}
        />

        <Flex
          direction="column"
          w="100%"
          gap="1rem"
          border="1px"
          borderRadius="md"
          padding="1rem"
        >
          <Text fontWeight="bold">Filter by high temperature threshold</Text>
          <Flex gap="1rem" w="100%">
            <TempSlider
              threshold={tempThreshold}
              setThreshold={setTempThreshold}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
