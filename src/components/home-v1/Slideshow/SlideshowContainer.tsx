import React from "react";
// Components
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SlideshowCard from "./SlideshowCard";
// Types
import { SlideshowItem } from "./SlideshowTypes";

interface SlideshowContainerProps {
  items: SlideshowItem[];
  slideshowStyle: Record<string, string>;
  currentSlide: any;
  nextSlide: () => void;
  prevSlide: () => void;
  sectionTitle: string;
  isMobileOrTablet?: boolean;
}
function SlideshowContainer({
  items,
  slideshowStyle,
  currentSlide,
  nextSlide,
  prevSlide,
  sectionTitle,
  isMobileOrTablet,
}: SlideshowContainerProps) {
  const changeSlide = (i: number) => {
    if (currentSlide === 0 && i === 0) return;
    else if (currentSlide < i + 1) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  let prevScreenX: number;
  const handleTouchSlideChange = (e: React.PointerEvent) => {
    if (isMobileOrTablet && prevScreenX) {
      if (e.screenX - prevScreenX > 4) {
        prevSlide();
      }
      if (e.screenX - prevScreenX < -4) {
        nextSlide();
      }
    }
    prevScreenX = e.screenX;
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
                onPointerMove={(e) => handleTouchSlideChange(e)}
              >
                <SlideshowCard
                  item={item}
                  analyticsEventActions={{
                    cta_subsection: sectionTitle,
                    cta_text: item.title,
                    cta_position: `${i + 1}`,
                  }}
                  gaEventActionName={`${sectionTitle} - ${item.title} - ${
                    i + 1
                  }`}
                />
              </GridItem>
            );
          })}
      </Grid>
    </Box>
  );
}
export default SlideshowContainer;
