import React from "react";
// Components
import { Button, Box, useStyleConfig } from "@chakra-ui/react";

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
        {buttonDirection === "prev" ? "<" : ">"}
      </Button>
    </Box>
  );
}
export default SlideshowButton;
