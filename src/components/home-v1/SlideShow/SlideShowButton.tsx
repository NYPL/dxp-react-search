import React from "react";
// Components
import { Button } from "@chakra-ui/react";

interface SlideShowButtonProps {
  direction: string;
  nextSlide?: any;
  prevSlide?: any;
  visibility?: any;
}

function SlideShowButton({
  direction,
  nextSlide,
  prevSlide,
  visibility,
}: SlideShowButtonProps) {
  return (
    <Button
      tabIndex={-1}
      variant="slide-show"
      visibility={visibility}
      //@ts-ignore
      direction={direction}
      onClick={direction === "prev" ? prevSlide : nextSlide}
    >
      {direction === "prev" ? `<` : `>`}
    </Button>
  );
}
export default SlideShowButton;
