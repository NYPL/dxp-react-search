import React from "react";
// Components
import { Button } from "@chakra-ui/react";

interface SlideshowButtonProps {
  direction: string;
  nextSlide?: any;
  prevSlide?: any;
  visibility?: any;
}

function SlideshowButton({
  direction,
  nextSlide,
  prevSlide,
  visibility,
}: SlideshowButtonProps) {
  return (
    <Button
      tabIndex={-1}
      variant="slide-show"
      visibility={visibility}
      //@ts-ignore
      direction={direction}
      onClick={direction === "prev" ? prevSlide : nextSlide}
    >
      {direction === "prev" ? "<" : ">"}
    </Button>
  );
}
export default SlideshowButton;
