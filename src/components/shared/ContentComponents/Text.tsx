import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
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
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      <TextFormatted html={text} />
    </Box>
  );
}

export default Text;
