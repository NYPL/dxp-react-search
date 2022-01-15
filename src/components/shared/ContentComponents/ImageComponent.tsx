import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  Text,
  TextDisplaySizes,
} from "@nypl/design-system-react-components";
import Image from "../../shared/Image";

interface ImageComponentProps {
  id: string;
  type: string;
  image: any;
  caption?: string;
  credit?: string;
}

function ImageComponent({
  id,
  type,
  image,
  caption,
  credit,
}: ImageComponentProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      <Image
        id={image.id}
        alt={image.alt}
        uri={image.uri}
        useTransformation={true}
        transformations={image.transformations}
        transformationLabel={"max_width_960"}
        width={image.width}
        height={image.height}
        layout="responsive"
        quality={90}
      />
      {caption && (
        <Box fontSize="-1" fontWeight="regular">
          {caption}
        </Box>
      )}
      {credit && (
        <Box fontSize="-3" fontStyle="italic">
          {credit}
        </Box>
      )}
    </Box>
  );
}

export default ImageComponent;
