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
          "& iframe": {
            width: "100%",
            maxWidth: "100%",
          },
        }}
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    </Box>
  );
}

export default SocialEmbed;
