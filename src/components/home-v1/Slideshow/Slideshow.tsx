import React from "react";
// Components
import { Box } from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
import SlideshowContainer from "./SlideshowContainer";
import SlideshowButton from "./SlideshowButton";
// Hooks
import useSlideshowStyles from "./useSlideshow";
// Types
import { SlideshowItem } from "./SlideshowTypes";

interface SlideshowProps {
  title: string;
  link: string;
  items: SlideshowItem[];
}

function Slideshow({ title, link, items }: SlideshowProps) {
  const { currentSlide, prevSlide, nextSlide, slideshowStyle } =
    useSlideshowStyles(items.length, 11);
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
          <SlideshowButton direction={"prev"} prevSlide={prevSlide} />
        )}
        <SlideshowContainer
          items={items}
          slideshowStyle={slideshowStyle}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
        <SlideshowButton
          direction={"next"}
          nextSlide={nextSlide}
          visibility={currentSlide !== items.length - 1 ? "visibile" : "hidden"}
        />
      </Box>
    </ComponentWrapper>
  );
}

export default Slideshow;
