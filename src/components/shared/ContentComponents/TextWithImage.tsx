import * as React from "react";
import { Box, Heading } from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";
import Image from "next/image";
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
      {heading && <Heading level="two" text={heading} />}
      {image && (
        <Box
          width="100%"
          maxWidth={{ base: "auto", md: "25%", lg: "40%" }}
          float={{ md: "left" }}
          mr={{ md: "l" }}
          mb="s"
        >
          <Image
            id={image.id}
            alt={image.alt}
            src={
              image.transformations &&
              getImageTransformation("max_width_960", image.transformations)
            }
            layout="responsive"
            width={image.width}
            height={image.height}
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
