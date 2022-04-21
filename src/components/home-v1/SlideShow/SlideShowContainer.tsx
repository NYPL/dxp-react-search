import React from "react";
// Components
import { Box, Image, Heading, Text, Grid, Link } from "@chakra-ui/react";
import Card from "../CardGrid/Card";
// Types
import { SlideShowItem } from "./SlideShowTypes";

interface SlideShowContainerProps {
  items: SlideShowItem[];
  slideShowStyle: Record<string, string>;
}
function SlideShowContainer({
  items,
  slideShowStyle,
}: SlideShowContainerProps) {
  return (
    <Box w="full" overflow="hidden">
      <Grid
        as="ul"
        h={{ base: "310px", md: "300px", lg: "340px" }}
        listStyleType="none"
        templateColumns="repeat(10, 1fr)"
        gap={{ base: 4, md: 5, lg: "32px" }}
        ml={slideShowStyle.marginLeft}
        transition={slideShowStyle.transition}
      >
        {items &&
          items.map((item: SlideShowItem) => {
            return <Card item={item} variant="slide-show-card" />;
          })}
      </Grid>
    </Box>
  );
}
export default SlideShowContainer;
