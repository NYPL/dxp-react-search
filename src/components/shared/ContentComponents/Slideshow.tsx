import React from "react";
import { Box } from "@nypl/design-system-react-components";
interface SlideshowProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
}

function Slideshow({ id, type, heading, description }: SlideshowProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      <h3>{type}</h3>
      {id}
    </Box>
  );
}

export default Slideshow;
