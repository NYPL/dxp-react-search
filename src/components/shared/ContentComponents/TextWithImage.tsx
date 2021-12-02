import React from "react";
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
    <div key={id}>
      <h3>Type: {type}</h3>
      <p>id: {id}</p>
      <p>heading: {heading}</p>
      <p>text: {text}</p>
      <Image
        id={image.id}
        alt={image.alt}
        uri={image.uri}
        useTransformation={true}
        transformations={image.transformations}
        transformationLabel={"medium"}
        layout="responsive"
        width={220}
        height={220}
        quality={90}
      />
    </div>
  );
}

export default TextWithImage;
