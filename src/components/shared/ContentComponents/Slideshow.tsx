import React from "react";
import { Box } from "@nypl/design-system-react-components";
import Heading from "./../Heading";
interface SlideshowProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
}

function Slideshow({ id, type }: SlideshowProps) {
  return (
    <Box id={`${type}-${id}`} mb="l">
      <Heading level="h2">{type}</Heading>
      {id}
    </Box>
  );
}

export default Slideshow;
