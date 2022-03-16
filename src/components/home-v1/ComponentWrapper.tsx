import React from "react";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

interface ComponentWrapperProps {
  title: string;
  children: JSX.Element;
}

function ComponentWrapper({ title, children }: ComponentWrapperProps) {
  return (
    <Box mb={8}>
      <Grid templateColumns="repeat(10, 1fr)" gap={1}>
        <GridItem width="150px">
          <Box borderTop="2px solid red" mr="25px">
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
        </GridItem>
        <GridItem colSpan={9}>{children}</GridItem>
      </Grid>
    </Box>
  );
}

export default ComponentWrapper;
