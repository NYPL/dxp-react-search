import React from "react";
// Components
import { Button, Box, useStyleConfig, createIcon } from "@chakra-ui/react";

// SVG Icon
const ChevronLeftIcon = createIcon({
  displayName: "ChevronLeft",
  viewBox: "0 0 10 17",
  path: (
    <path
      d="M8.6001 1.02499L1.60277 7.74249C1.33254 8.00191 1.33254 8.44807 1.60277 8.70749L8.6001 15.425"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  ),
});

// SVG Icon
const ChevronRightIcon = createIcon({
  displayName: "ChevronRight",
  viewBox: "0 0 10 17",
  path: (
    <path
      d="M1.3999 15.425L8.39723 8.70752C8.66746 8.4481 8.66746 8.00194 8.39723 7.74252L1.3999 1.02502"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  ),
});
interface SlideshowButtonProps {
  buttonDirection: string;
  nextSlide?: any;
  prevSlide?: any;
  visibility?: any;
}

function SlideshowButton({
  buttonDirection,
  nextSlide,
  prevSlide,
  visibility,
}: SlideshowButtonProps) {
  const style = useStyleConfig("ButtonContainer", { buttonDirection });

  return (
    <Box id={`slideshow-${buttonDirection}-button-container`} __css={style}>
      <Button
        id={`slideshow-${buttonDirection}-button`}
        tabIndex={-1}
        variant="slide-show"
        visibility={visibility}
        onClick={buttonDirection === "prev" ? prevSlide : nextSlide}
      >
        {buttonDirection === "prev" ? (
          <ChevronLeftIcon aria-label="Chevron Left" />
        ) : (
          <ChevronRightIcon aria-label="Chevron Right" />
        )}
      </Button>
    </Box>
  );
}
export default SlideshowButton;
