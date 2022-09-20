import React from "react";
// Components
import { Button } from "@chakra-ui/react";

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
  return (
    <Button
      tabIndex={-1}
      variant="slide-show"
      visibility={visibility}
      //@ts-ignore
      buttonDirection={buttonDirection}
      onClick={buttonDirection === "prev" ? prevSlide : nextSlide}
    >
      {buttonDirection === "prev" ? "<" : ">"}
    </Button>
  );
}
export default SlideshowButton;
