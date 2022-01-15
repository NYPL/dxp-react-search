import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";

interface TextProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
}

function Text({ id, type, heading, text }: TextProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      <Box
        sx={{
          "& ul": {
            paddingLeft: "s",
          },
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </Box>
  );
}

export default Text;
