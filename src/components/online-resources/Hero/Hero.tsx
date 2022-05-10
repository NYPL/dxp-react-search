import React from "react";
// Components
import { Hero as DsHero, Heading } from "@nypl/design-system-react-components";
// Content
import onlineResourcesContent from "./../../../__content/onlineResources";

function Hero() {
  const { title, description } = onlineResourcesContent;

  return (
    <DsHero
      heroType="tertiary"
      heading={<Heading level="one" text={title} />}
      subHeaderText={description}
      backgroundColor="#00838A"
      foregroundColor="#ffffff"
    />
  );
}

export default Hero;
