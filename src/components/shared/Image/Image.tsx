import React from "react";
// Next components
import { default as NextImage } from "next/image";

interface ImageProps {
  id: string;
  alt: string;
  // @TODO add correct type.
  layout: any;
  // @TODO check if number is correct type.
  width: number;
  height: number;
  quality: number;
  uri: string;
  useTransformation: boolean;
  // @TODO add correct type.
  transformations?: any;
  transformationLabel: string;
}

interface Transformation {
  id: string;
  label: string;
  uri: string;
}

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
    transformations: any
  ) {
    let imageUri;

    transformations.map((transformation: Transformation) => {
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
