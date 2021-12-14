import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  Text,
  TextDisplaySizes,
} from "@nypl/design-system-react-components";
import Image from "../../shared/Image";

interface TextWithImageProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
  image: any;
}

function TextWithImage({ id, type, heading, text, image }: TextWithImageProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      <Box
        width="100%"
        maxWidth={[null, null, "50%"]}
        float={[null, null, "left"]}
        mr={[null, null, "m"]}
      >
        <Image
          id={image.id}
          alt={image.alt}
          uri={image.uri}
          useTransformation={true}
          transformations={image.transformations}
          transformationLabel={"medium"}
          layout="intrinsic"
          width={960}
          height={450}
          quality={90}
        />
      </Box>
      <Box dangerouslySetInnerHTML={{ __html: text }} />
    </Box>
  );
}

export default TextWithImage;
