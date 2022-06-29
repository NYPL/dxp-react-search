import React from "react";
// Component
import { Box } from "@nypl/design-system-react-components";
// Content
import HeroImage from "./HeroImage";
import HeroContent from "./content";

function Hero(): JSX.Element {
  // Content
  const { text } = HeroContent;

  return (
    <Box bg="#D0343A" pb={{ base: "2rem", lg: "0" }} maxH={{ lg: "140px" }}>
      <Box
        display="flex"
        flexFlow={{ base: "column", lg: "row" }}
        flexWrap="nowrap"
        alignItems="center"
        w="100%"
        maxW="1280px"
        px="1rem"
        mx="auto"
        my="0px"
      >
        <Box
          w="100%"
          mb={{ base: "1.5rem", lg: "0px" }}
          sx={{ svg: { height: "140px", fill: "white" } }}
        >
          <HeroImage />
        </Box>
        <Box
          color="ui.white"
          w="100%"
          flex={{ lg: "0 0 50%" }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Box>
    </Box>
  );
}

export default Hero;
