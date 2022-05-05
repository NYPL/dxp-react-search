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
  link: string;
  items: SlideShowItem[];
}

function SlideShow({ title, link, items }: SlideShowProps) {
  const { currentSlide, prevSlide, nextSlide, slideShowStyle } =
    useSlideShowStyles(items.length, 11);
  return (
    <ComponentWrapper
      title={title}
      link={link}
      textColor="brand.100"
      bg="red.100"
      borderColor="red.100"
      buttonBorder="brand.100"
      gap={{ base: 0, md: 2, lg: 3, xl: 9 }}
    >
      <Box
        w="full"
        position="relative"
        mt={{ base: `${currentSlide === 0 ? 0 : -9}`, md: 0 }}
      >
        {currentSlide > 0 && (
          <SlideShowButton direction={"prev"} prevSlide={prevSlide} />
        )}
        <SlideShowContainer
          items={items}
          slideShowStyle={slideShowStyle}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
        <SlideShowButton
          direction={"next"}
          nextSlide={nextSlide}
          visibility={currentSlide !== items.length - 1 ? "visibile" : "hidden"}
        />
      </Box>
    </ComponentWrapper>
  );
}

export default SlideShow;
