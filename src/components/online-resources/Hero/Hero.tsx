import React from "react";
// Components
import { Hero as DsHero } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
// Content
import onlineResourcesContent from "./../../../__content/onlineResources";

function Hero() {
  const { title, description } = onlineResourcesContent;

  return (
    <DsHero
      heroType="tertiary"
      heading={
        <Heading level="h1" color="#ffffff">
          {title}
        </Heading>
      }
      subHeaderText={description}
      backgroundColor="#00838A"
      foregroundColor="#ffffff"
    />
  );
}

export default Hero;
