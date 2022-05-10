import React from "react";
import { Box, Heading } from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";

interface AudioEmbedProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  provider: string;
  html: string;
}

function AudioEmbed({
  id,
  type,
  heading,
  description,
  provider,
  html,
}: AudioEmbedProps) {
  return (
    <Box
      id={`${type}-${provider}-${id}`}
      maxWidth={{ lg: "800px" }}
      w={{ lg: "100%" }}
      px={{ lg: "xxl" }}
      my="0"
      mx="auto"
      mb="xl"
    >
      {heading && <Heading level="two" text={heading} />}
      {description && <TextFormatted html={description} />}
      {html && (
        <Box
          sx={{
            "& iframe": {
              width: "100%",
              maxWidth: "100%",
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </Box>
  );
}

export default AudioEmbed;
