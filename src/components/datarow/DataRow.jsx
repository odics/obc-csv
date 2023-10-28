import React from "react";
import { Flex } from "@chakra-ui/react";

const DataRow = ({
  setSelectedLoc,
  setActiveDataPoint,
  activeDataPoint,
  time,
  asset_name,
  recording_id,
  position_yards,
  latitude,
  longitude,
  score,
  index,
  item,
  color,
}) => {
  const formatDateTime = (unix_time) => {
    const formattedDate = new Date(unix_time * 1000);
    return formattedDate.toLocaleDateString();
  };
  return (
    <Flex
      gap="2rem"
      w="100%"
      border="1px"
      padding=".5rem"
      borderRadius="md"
      onClick={() => {
        setSelectedLoc(item);
        setActiveDataPoint(index);
      }}
      cursor="pointer"
      align="center"
      _hover={{ bg: "#edf2f7" }}
      bgColor={activeDataPoint === index ? "#edf2f7" : "white"}
    >
      <Flex minW="90px">{formatDateTime(time)}</Flex>
      <Flex w="auto">{asset_name}</Flex>
      <Flex minW="60px">{recording_id}</Flex>
      <Flex minW="67px">{position_yards}</Flex>
      <Flex minW="90px">{latitude}</Flex>
      <Flex minW="90px">{longitude}</Flex>
      <Flex
        border="1px"
        borderRadius="md"
        padding=".3rem"
        h="35px"
        align="center"
        justify="center"
        bgColor={color}
      >
        {score}°C
      </Flex>
    </Flex>
  );
};

export default DataRow;
