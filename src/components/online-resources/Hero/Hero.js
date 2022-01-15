import React from "react";
// Components
import {
  Hero as DsHero,
  HeroTypes,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
// Content
import onlineResourcesContent from "./../../../__content/onlineResources";

function Hero() {
  const { title, description } = onlineResourcesContent;

  return (
    <DsHero
      heroType={HeroTypes.Tertiary}
      heading={<Heading level={HeadingLevels.One} text={title} />}
      subHeaderText={description}
      backgroundColor="#00838A"
      foregroundColor="#ffffff"
    />
  );
}

export default Hero;
