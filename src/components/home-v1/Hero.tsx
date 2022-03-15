import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface HeroProps {
  title: string;
  description: string;
  tag: string;
  image?: string;
}

function Hero({ title, description, tag, image }: HeroProps) {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexFlow="row nowrap"
      justifyContent="center"
      height="400px"
      minHeight="400px"
      pb="35px"
      bgImage={`url(${image})`}
    >
      <Box flex="0 0 50%" maxWidth="1313px" width="100%" margin="0 auto">
        <Box
          maxWidth="525px"
          backgroundColor="#333"
          color="#FFF"
          padding="15px"
        >
          <Box>{tag}</Box>
          <Heading>{title}</Heading>
          <Text py={8}>{description}</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
