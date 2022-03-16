import React from "react";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

interface ComponentWrapperProps {
  title: string;
  children: JSX.Element;
}

function ComponentWrapper({ title, children }: ComponentWrapperProps) {
  return (
    <Box mb={8}>
      <Grid
        templateAreas={`'heading component'`}
        templateColumns="150px auto"
        gap={1}
      >
        <GridItem gridArea="heading">
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
        <GridItem gridArea="component">{children}</GridItem>
      </Grid>
    </Box>
  );
}

export default ComponentWrapper;
