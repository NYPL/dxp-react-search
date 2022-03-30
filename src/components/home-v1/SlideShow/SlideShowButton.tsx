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
      ml={{
        base: direction === "next" ? "50vw" : "35vw",
        md: direction === "next" ? "-60px" : "-110px",
      }}
      mt={{
        md: direction === "next" ? "-155px" : "-180px",
        lg: direction === "next" ? "-155px" : "-160px",
      }}
      top={{ base: direction === "next" ? "15px" : "350px" }}
      color="white"
      border="2px"
      borderColor="white"
      borderRadius="full"
      fontSize="30px"
      bg="transparent"
      h="35px !important"
      w="35px !important"
      minWidth="unset"
      onClick={direction === "next" ? nextSlide : prevSlide}
    >
      {direction === "next" ? `>` : `<`}
    </Button>
  );
}
export default SlideShowButton;
