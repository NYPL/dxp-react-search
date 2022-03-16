import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface ComponentWrapperProps {
  title: string;
  children: JSX.Element;
}

function ComponentWrapper({ title, children }: ComponentWrapperProps) {
  return (
    <Box mb={8}>
      <Flex>
        <Box width="10%" borderTop="2px solid red" mr="25px">
          <Heading
            as="h2"
            size="md"
            color="#E32B31"
            fontWeight="bold"
            fontFamily="Kievit-Medium"
            float="right"
            pt={2}
          >
            {title}
          </Heading>
        </Box>
        <Box flex="1">{children}</Box>
      </Flex>
    </Box>
  );
}

export default ComponentWrapper;
