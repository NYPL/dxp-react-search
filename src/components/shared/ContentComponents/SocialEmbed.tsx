import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";

interface SocialEmbedProps {
  id: string;
  type: string;
  embedCode: string;
}
function SocialEmbed({ id, type, embedCode }: SocialEmbedProps) {
  return (
    <Box id={`${type}-${id}`} w="100%" mb="xl">
      <Box
        sx={{
          display: "none",
        }}
      >
        Text describing this map, that only screen readers will see.
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

export default SocialEmbed;
