import React from "react";
import { Box } from "@nypl/design-system-react-components";

interface GoogleMapEmbedProps {
  id: string;
  type: string;
  embedCode: string;
  accessibleDescription: string;
}
function GoogleMapEmbed({
  id,
  type,
  accessibleDescription,
  embedCode,
}: GoogleMapEmbedProps) {
  return (
    <Box id={`${type}-${id}`} w="100%" mb="l">
      <Box
        sx={{
          display: "none",
        }}
      >
        {accessibleDescription}
      </Box>
      <Box
        sx={{
          "& iframe": {
            width: "100%",
            maxWidth: "100%",
          },
        }}
        aria-hidden={true}
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </Box>
  );
}

export default GoogleMapEmbed;
