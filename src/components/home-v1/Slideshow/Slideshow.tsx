import React from "react";
// Components
import { Box } from "@chakra-ui/react";
import ComponentWrapper, { SeeMore } from "../ComponentWrapper";
import SlideshowContainer from "./SlideshowContainer";
import SlideshowButton from "./SlideshowButton";
// Hooks
import useSlideshowStyles from "./useSlideshow";
// Types
import { SlideshowItem } from "./SlideshowTypes";

interface SlideshowProps {
  id?: string;
  title: string;
  link: string;
  items: SlideshowItem[];
  seeMore?: SeeMore;
}

function Slideshow({ id, title, link, items, seeMore }: SlideshowProps) {
  const { currentSlide, prevSlide, nextSlide, slideshowStyle } =
    useSlideshowStyles(items.length, 15.7);
  return (
    <ComponentWrapper
      id={id}
      title={title}
      link={link}
      textColor="brand.100"
      bg="red.100"
      borderColor="red.100"
      buttonBorder="brand.100"
      gap={{ base: 0, md: 2, lg: 3, xl: 9 }}
      seeMore={seeMore}
    >
      <Box
        w="full"
        position="relative"
        mt={{ base: `${currentSlide === 0 ? 0 : -9}`, md: 0 }}
      >
        <SlideshowButton
          buttonDirection={"prev"}
          prevSlide={prevSlide}
          visibility={currentSlide > 0 ? "visible" : "hidden"}
        />
        <SlideshowContainer
          items={items}
          slideshowStyle={slideshowStyle}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          sectionTitle={title}
        />
        <SlideshowButton
          buttonDirection={"next"}
          nextSlide={nextSlide}
          visibility={currentSlide !== items.length - 1 ? "visible" : "hidden"}
        />
      </Box>
    </ComponentWrapper>
  );
}

export default Slideshow;
