import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";

interface AudioEmbedProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  html: string;
}

function AudioEmbed({ id, type, heading, description, html }: AudioEmbedProps) {
  return (
    <Box
      id={`${type}-${id}`}
      maxWidth={[null, null, "800px"]}
      w={[null, null, "100%"]}
      px={[null, null, "xxl"]}
      my="0"
      mx="auto"
      mb="xl"
    >
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      {description && <Box dangerouslySetInnerHTML={{ __html: description }} />}
      <Box
        sx={{
          "& iframe": {
            width: "100%",
            maxWidth: "100%",
          },
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  );
}

export default AudioEmbed;
