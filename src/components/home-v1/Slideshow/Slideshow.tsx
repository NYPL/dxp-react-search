import React from "react";
// Components
import { Box } from "@chakra-ui/react";
import ComponentWrapper, { SeeMore } from "../ComponentWrapper";
import SlideshowContainer from "./SlideshowContainer";
import SlideshowButton from "./SlideshowButton";
// Hooks
import useSlideshowStyles from "./useSlideshow";
import useWindowSize from "../../../hooks/useWindowSize";
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
  const [isMobileOrTablet, setIsMobileOrTablet] = React.useState(false);
  const [isLargerThanMobile, setIsLargerThanMobile] = React.useState(false);
  const windowSize = useWindowSize();
  React.useEffect(() => {
    if (windowSize) {
      setIsMobileOrTablet(windowSize <= 820);
      setIsLargerThanMobile(windowSize > 600);
    }
  }, [windowSize]);
  // Ensure items array is never longer than 10 items.
  const finalItems: SlideshowItem[] = items.slice(0, 10);

  const { currentSlide, prevSlide, nextSlide, slideshowStyle } =
    useSlideshowStyles(finalItems.length, Math.floor(100 / finalItems.length));

  return (
    <ComponentWrapper
      id={id}
      title={title}
      link={link}
      textColor="brand.100"
      bg="red.100"
      borderColor="red.100"
      buttonBorder="brand.100"
      seeMore={seeMore}
    >
      <Box w="full" position="relative" mt={{ base: 0, sx: -9, md: 0 }}>
        {isLargerThanMobile && (
          <SlideshowButton
            buttonDirection="prev"
            prevSlide={prevSlide}
            visibility={currentSlide > 0 ? "visible" : "hidden"}
          />
        )}
        <SlideshowContainer
          items={finalItems}
          slideshowStyle={slideshowStyle}
          currentSlide={currentSlide}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          sectionTitle={title}
          isMobileOrTablet={isMobileOrTablet}
        />
        {isLargerThanMobile && (
          <SlideshowButton
            buttonDirection="next"
            nextSlide={nextSlide}
            visibility={
              currentSlide !== finalItems.length - 1 ? "visibile" : "hidden"
            }
          />
        )}
      </Box>
    </ComponentWrapper>
  );
}

export default Slideshow;
