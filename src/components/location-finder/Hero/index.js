import React from 'react';
// Content
import HeroContent from './content';

function Hero() {
  // Content
  const { text } = HeroContent;

  return (
    <div className='hero'>
      <div className='hero__image'></div>
      <div className='hero__content'>{ text }</div>
    </div>
  );
};

export default Hero;
