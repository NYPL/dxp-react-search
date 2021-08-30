import React from "react";
// Next components
import { default as NextImage } from "next/image";
import { ImageType as ImageProps, TransformationType } from "./ImageTypes";

function Image({
  id,
  alt,
  layout,
  width,
  height,
  quality,
  transformationLabel,
  useTransformation,
  transformations,
  uri,
}: ImageProps) {
  // Get the image transformation value.
  function getImageTransformation(
    transformationLabel: string,
    // @TODO fix this
    transformations: any
  ) {
    let imageUri;

    transformations.map((transformation: TransformationType) => {
      if (transformation.label === transformationLabel) {
        imageUri = transformation.uri;
      }
    });
    return imageUri;
  }

  return (
    <NextImage
      alt={alt}
      // @ts-ignore
      src={
        useTransformation
          ? getImageTransformation(transformationLabel, transformations)
          : uri
      }
      layout={layout}
      width={width}
      height={height}
      quality={quality}
    />
  );
}

export default Image;
