import React from "react";
import { Box } from "@nypl/design-system-react-components";

interface SocialEmbedProps {
  id: string;
  type: string;
  embedCode: string;
}
function SocialEmbed({ id, type, embedCode }: SocialEmbedProps) {
  return (
    <Box id={`${type}-${id}`} w="100%" mb="l">
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
