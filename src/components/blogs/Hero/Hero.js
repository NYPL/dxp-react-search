import React from 'react';
// Components
import { Hero as DsHero } from '@nypl/design-system-react-components';
// Content
import HeroContent from './content';

function Hero() {
  const { title, description } = HeroContent;

  return (
    <DsHero
      heroType={'TERTIARY'}
      heading={<h1>{title}</h1>}
      subHeaderText={description}
      backgroundColor="#E0E0E0"
      foregroundColor="#000000"
    />
  );
};

export default Hero;