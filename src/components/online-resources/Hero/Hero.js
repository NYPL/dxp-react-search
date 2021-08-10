import React from 'react';
// Components
import { Hero as DsHero } from '@nypl/design-system-react-components';
// Content
import onlineResourcesContent from './../../../__content/onlineResources';

function Hero() {
  const { title, description } = onlineResourcesContent;

  return (
    <DsHero
      heroType={'TERTIARY'}
      heading={<h1>{title}</h1>}
      subHeaderText={description}
      backgroundColor="#00838A"
      foregroundColor="#ffffff"
    />
  );
};

export default Hero;
