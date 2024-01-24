import * as React from "react";
import { Box } from "@nypl/design-system-react-components";
import Heading from "../Heading";
import TextFormatted from "./../TextFormatted";
import Image from "next/image";
import { getImageTransformation } from "./../../shared/Image/imageUtils";
import { WithLink } from "./ImageComponent";

interface TextWithImageProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
  caption?: string;
  credit?: string;
  link?: string;
  image?: any;
}

function TextWithImage({
  id,
  type,
  heading,
  text,
  caption,
  credit,
  link,
  image,
}: TextWithImageProps) {
  let imageSrc: string = image?.uri;
  if (image?.transformations) {
    const transformationUri = getImageTransformation(
      "max_width_960",
      image.transformations
    );
    if (transformationUri !== null) {
      imageSrc = transformationUri;
    }
  }

  return (
    <Box id={`${type}-${id}`} mb="l">
      {heading && <Heading level="h2">{heading}</Heading>}
      {image && (
        <Box
          width="100%"
          maxWidth={{ base: "auto", md: "25%", lg: "40%" }}
          float={{ md: "left" }}
          mr={{ md: "l" }}
          mb="s"
        >
          <WithLink link={link}>
            <Image
              id={image.id}
              alt={image.alt}
              src={imageSrc}
              layout="responsive"
              width={image.width}
              height={image.height}
            />
          </WithLink>
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
