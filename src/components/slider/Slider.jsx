import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";

const TempSlider = ({ threshold, setThreshold }) => {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  console.log("SLIDER:", threshold);

  return (
    <Box pt={6} pb={2} w="100%">
      <Slider onChange={(val) => setThreshold(val)} defaultValue={80}>
        <SliderMark value={25} {...labelStyles}>
          25°C
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          50°C
        </SliderMark>
        <SliderMark value={75} {...labelStyles}>
          75°C
        </SliderMark>
        <SliderMark
          value={threshold}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {threshold}°C
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default TempSlider;
