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
      float={{ md: "left" }}
      color="brand.100"
      border="2px"
      borderColor="brand.100"
      borderRadius="full"
      fontSize="3xl"
      bg="transparent"
      h={9}
      w={9}
      minWidth="unset"
      ml={{
        base: direction === "prev" ? "40vw" : "55vw",
        md: direction === "prev" ? "-120px" : "-60px",
        lg: direction === "prev" ? "-110px" : "-60px",
      }}
      mt={{
        md: direction === "prev" ? "125px" : "-175px",
        lg: direction === "prev" ? "125px" : "-215px",
      }}
      top={{
        base: direction === "prev" ? "362px" : 4,
        md: 0,
      }}
      onClick={direction === "prev" ? prevSlide : nextSlide}
    >
      {direction === "next" ? `>` : `<`}
    </Button>
  );
}
export default SlideShowButton;
