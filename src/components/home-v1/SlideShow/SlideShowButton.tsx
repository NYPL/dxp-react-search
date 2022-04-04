import React from "react";
// Components
import { Button } from "@chakra-ui/react";

interface SlideShowButtonProps {
  direction: string;
  nextSlide?: any;
  prevSlide?: any;
}

function SlideShowButton({
  direction,
  nextSlide,
  prevSlide,
}: SlideShowButtonProps) {
  return (
    <Button
      variant="slide-show"
      //@ts-ignore
      direction={direction}
      onClick={direction === "prev" ? prevSlide : nextSlide}
    >
      {direction === "prev" ? `<` : `>`}
    </Button>
  );
}
export default SlideShowButton;
