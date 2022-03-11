import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";
import useOembedApi from "./../../../hooks/useOembedApi";

interface AudioEmbedProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  embedCode: string;
  oembedUrl: string;
  provider: string;
}

function AudioEmbed({
  id,
  type,
  heading,
  description,
  embedCode,
  oembedUrl,
  provider,
}: AudioEmbedProps) {
  const html = useOembedApi(oembedUrl, embedCode);

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
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
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
