import React from "react";
// Components
import { Box } from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
import SlideShowContainer from "./SlideShowContainer";
import SlideShowButton from "./SlideShowButton";
// Hooks
import useSlideShowStyles from "./useSlideShow";
// Types
import { SlideShowItem } from "./SlideShowTypes";

interface SlideShowProps {
  title: string;
  items: SlideShowItem[];
}

function SlideShow({ title, items }: SlideShowProps) {
  const { currentSlide, prevSlide, nextSlide, slideShowStyle } =
    useSlideShowStyles(items.length, 11);
  return (
    <ComponentWrapper
      title={title}
      textColor="brand.100"
      bg="red.100"
      borderColor="red.100"
      buttonBorder="white"
    >
      <Box
        w="full"
        position="relative"
        mt={{ base: `${currentSlide === 0 ? 0 : -9}`, md: 0 }}
      >
        {currentSlide > 0 && (
          <SlideShowButton direction={"prev"} prevSlide={prevSlide} />
        )}
        <SlideShowContainer items={items} slideShowStyle={slideShowStyle} />
        {currentSlide !== items.length - 1 && (
          <SlideShowButton direction={"next"} nextSlide={nextSlide} />
        )}
      </Box>
    </ComponentWrapper>
  );
}

export default SlideShow;
