import React from "react";
import { Box, Heading } from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";
// Utils
import { getImageTransformation } from "./../../shared/Image/imageUtils";

interface TextWithImageProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
  caption?: string;
  credit?: string;
  image?: any;
}

function TextWithImage({
  id,
  type,
  heading,
  text,
  caption,
  credit,
  image,
}: TextWithImageProps) {
  return (
    <Box id={`${type}-${id}`} mb="l">
      {heading && <Heading level="two" text={heading} />}
      {image && (
        <Box
          width="100%"
          maxWidth={{ base: "auto", md: "25%", lg: "40%" }}
          float={{ md: "left" }}
          mr={{ md: "l" }}
          mb="s"
        >
          <img
            id={image.id}
            alt={image.alt}
            src={getImageTransformation("max_width_960", image.transformations)}
            width="100%"
            height="auto"
          />
          {caption && (
            <Box fontSize="-1" fontWeight="regular">
              {caption}
            </Box>
          )}
          {credit && (
            <Box
              fontSize="-3"
              fontStyle="italic"
              dangerouslySetInnerHTML={{ __html: credit }}
            />
          )}
        </Box>
      )}
      <TextFormatted html={text} />
      <Box
        as="span"
        sx={{
          content: '""',
          display: "block",
          clear: "both",
        }}
      />
    </Box>
  );
}

export default TextWithImage;
