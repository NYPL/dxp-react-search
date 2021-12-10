import React from "react";
import { Heading, HeadingLevels } from "@nypl/design-system-react-components";
import Image from "../../shared/Image";
import s from "./TextWithImage.module.css";

interface TextWithImageProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
  image: any;
}

function TextWithImage({ id, type, heading, text, image }: TextWithImageProps) {
  return (
    <div id={id} className={s.container}>
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      <div className={s.image}>
        <Image
          id={image.id}
          alt={image.alt}
          uri={image.uri}
          useTransformation={true}
          transformations={image.transformations}
          transformationLabel={"medium"}
          layout="intrinsic"
          width={640}
          height={360}
          quality={90}
        />
      </div>
      <div className={s.text} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default TextWithImage;
