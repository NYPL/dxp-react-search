import React from "react";
// Components
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Card from "../CardGrid/Card";
// Types
import { SlideshowItem } from "./SlideshowTypes";

interface SlideshowContainerProps {
  items: SlideshowItem[];
  slideshowStyle: Record<string, string>;
  currentSlide: any;
  nextSlide: () => void;
  prevSlide: () => void;
}
function SlideshowContainer({
  items,
  slideshowStyle,
  currentSlide,
  nextSlide,
  prevSlide,
}: SlideshowContainerProps) {
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
        ml={slideshowStyle.marginLeft}
        transition={slideshowStyle.transition}
      >
        {items &&
          items.map((item: SlideshowItem, i) => {
            return (
              <GridItem
                as="li"
                key={item.id}
                h="full"
                onFocus={() => changeSlide(i)}
              >
                <Card item={item} variant="slide-show-card" />
              </GridItem>
            );
          })}
      </Grid>
    </Box>
  );
}
export default SlideshowContainer;
