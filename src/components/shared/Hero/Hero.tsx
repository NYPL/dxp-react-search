import * as React from "react";
import {
  Box,
  Heading,
  Hero as DsHero,
} from "@nypl/design-system-react-components";
import { getImageTransformation } from "./../Image/imageUtils";
import { ImageType } from "./../Image/ImageTypes";
import TextFormatted from "./../TextFormatted";

type HeroProps = {
  id: string;
  type: string;
  heroType: "primary" | "tertiary" | "campaign";
  title: string;
  description: string;
  backgroundImage: ImageType;
  foregroundImage: ImageType;
};

export default function Hero({
  id,
  type,
  heroType,
  title,
  description,
  backgroundImage,
  foregroundImage,
}: HeroProps) {
  const backgroundImageSrc =
    backgroundImage && backgroundImage.transformations
      ? getImageTransformation(
          "hero_header_focal_point_2400x400",
          backgroundImage.transformations
        )
      : null;

  const foregroundImageSrc =
    foregroundImage && foregroundImage.transformations
      ? getImageTransformation("2_1_960", foregroundImage.transformations)
      : null;

  const backgroundColor = heroType === "campaign" ? "ui.white" : "ui.black";
  const overlayBackgroundColor = "ui.black";
  const overlayTextColor = "ui.white";

  return (
    <Box id={`${type}-${heroType}__${id}`}>
      <DsHero
        heroType={heroType}
        heading={<Heading level="one" text={title} />}
        subHeaderText={<TextFormatted html={description} />}
        backdropBackgroundColor={backgroundColor}
        backgroundColor={overlayBackgroundColor}
        foregroundColor={overlayTextColor}
        // @TODO Conditionally add this prop ?
        backgroundImageSrc={backgroundImageSrc as string}
        // @TODO Conditionally add this prop ?
        imageProps={{
          src: foregroundImageSrc as string,
          alt: foregroundImage?.alt,
        }}
      />
    </Box>
  );
}
