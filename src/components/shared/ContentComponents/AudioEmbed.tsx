import React from "react";
import { Box } from "@nypl/design-system-react-components";
import Heading from "../Heading";
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
      mb="l"
    >
      {heading && <Heading level="h2">{heading}</Heading>}
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
