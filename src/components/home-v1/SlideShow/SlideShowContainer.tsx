import React from "react";
// Components
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Card from "../CardGrid/Card";
// Types
import { SlideShowItem } from "./SlideShowTypes";

interface SlideShowContainerProps {
  items: SlideShowItem[];
  slideShowStyle: Record<string, string>;
  currentSlide: any;
  nextSlide: () => void;
  prevSlide: () => void;
}
function SlideShowContainer({
  items,
  slideShowStyle,
  currentSlide,
  nextSlide,
  prevSlide,
}: SlideShowContainerProps) {
  const changeSlide = (i: number) => {
    if (currentSlide === 0 && i === 0) return;
    else if (currentSlide < i + 1) {
      nextSlide();
    } else {
      prevSlide();
    }
  };
  return (
    <Box w="full" overflow="hidden">
      <Grid
        as="ul"
        h={{ base: "310px", md: "300px", lg: "340px" }}
        w="full"
        listStyleType="none"
        templateColumns="repeat(10, 1fr)"
        gap={{ base: 4, md: 5, lg: "32px" }}
        ml={slideShowStyle.marginLeft}
        transition={slideShowStyle.transition}
      >
        {items &&
          items.map((item: SlideShowItem, i) => {
            return (
              <GridItem as="li" h="full" onFocus={() => changeSlide(i)}>
                <Card item={item} variant="slide-show-card" />
              </GridItem>
            );
          })}
      </Grid>
    </Box>
  );
}
export default SlideShowContainer;
