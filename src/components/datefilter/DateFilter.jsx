import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { sortDates } from "../../utils/sortingFunctions";

import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ data, setSortedData, setDisplayData }) => {
  const sortedDates = sortDates(data, 1);
  const minDate = new Date(parseInt(sortedDates[0].UNIX_TIME) * 1000);
  const maxDate = new Date(
    parseInt(sortedDates[sortedDates.length - 1].UNIX_TIME) * 1000
  );

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  useEffect(() => {
    const filteredDates = data.filter((item) => {
      const itemDate = new Date(parseInt(item.UNIX_TIME) * 1000);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setSortedData(filteredDates);
    setDisplayData(filteredDates);
  }, [startDate, endDate, data, setSortedData, setDisplayData]);

  return (
    <Flex direction="column" gap=".5rem">
      <Flex gap="1rem" align="center">
        <Text w="90px" fontWeight="bold">
          Start date:
        </Text>
        <Flex border="1px" borderRadius="md" padding=".3rem">
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            dateFormat="d MMMM yyyy"
          />
        </Flex>
      </Flex>
      <Flex gap="1rem" align="center">
        <Text w="90px" fontWeight="bold">
          End date:
        </Text>
        <Flex border="1px" borderRadius="md" padding=".3rem">
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            dateFormat="d MMMM yyyy"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DateFilter;
