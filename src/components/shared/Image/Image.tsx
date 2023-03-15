import React from "react";
// Next components
import { default as NextImage } from "next/image";
import { ImageType as ImageProps } from "./ImageTypes";
// Utils
import { getImageTransformation } from "./imageUtils";

function Image({
  id,
  alt,
  layout,
  width,
  height,
  objectFit,
  quality,
  transformationLabel,
  useTransformation,
  transformations,
  uri,
}: ImageProps) {
  let imageSrc = uri;
  if (useTransformation && transformations) {
    const transformationUri = getImageTransformation(
      transformationLabel,
      transformations
    );
    if (transformationUri !== null) {
      imageSrc = transformationUri;
    }
  }

  return (
    <div id={`nextjsImage-${id}`} className="scout-nextjs-image">
      <NextImage
        // id={`nextjsImage-${id}`}
        alt={alt}
        src={imageSrc}
        layout={layout}
        {...(width && {
          width: width,
        })}
        {...(height && {
          height: height,
        })}
        {...(objectFit && {
          objectFit: objectFit,
        })}
        quality={quality}
      />
    </div>
  );
}

export default Image;
