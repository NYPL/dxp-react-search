import React from "react";
import { Box, Heading } from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";
import useOembedApi from "./../../../hooks/useOembedApi";

interface VideoProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  embedCode: string;
  oembedUrl: string;
  provider: string;
}

function Video({
  id,
  type,
  heading,
  description,
  embedCode,
  oembedUrl,
  provider,
}: VideoProps) {
  const html = useOembedApi(oembedUrl, embedCode);

  return (
    <Box id={`${type}-${provider}-${id}`} mb="l">
      {heading && <Heading level="two" text={heading} />}
      {description && <TextFormatted html={description} />}
      {html && (
        <Box
          paddingBottom="56.25%"
          position="relative"
          sx={{
            "& iframe": {
              width: "100%",
              height: "100%",
              margin: "auto",
              position: "absolute",
              top: "0",
              left: "0",
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </Box>
  );
}

export default Video;
