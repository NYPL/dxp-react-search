import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
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
    <Box id={`${type}-${id}`} mb="xl">
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      {image && (
        <Box
          width="100%"
          maxWidth={[null, null, "50%"]}
          float={[null, null, "left"]}
          mr={[null, null, "m"]}
        >
          <img
            id={image.id}
            alt={image.alt}
            src={getImageTransformation("max_width_960", image.transformations)}
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
      <Box dangerouslySetInnerHTML={{ __html: text }} />
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
