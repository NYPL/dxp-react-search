import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";

interface VideoProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  html: string;
}

function Video({ id, type, heading, description, html }: VideoProps) {
  return (
    <Box id={`${type}-${id}`} className="video" mb="xl">
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      {description && <Box dangerouslySetInnerHTML={{ __html: description }} />}
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
    </Box>
  );
}

export default Video;
