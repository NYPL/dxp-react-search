import React from "react";
import { Box } from "@nypl/design-system-react-components";
import Heading from "../Heading";
import TextFormatted from "./../TextFormatted";

interface TextProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
}

function Text({ id, type, heading, text }: TextProps) {
  return (
    <Box id={`${type}-${id}`} mb="l">
      {heading && <Heading level="h2">{heading}</Heading>}
      <TextFormatted html={text} />
    </Box>
  );
}

export default Text;
