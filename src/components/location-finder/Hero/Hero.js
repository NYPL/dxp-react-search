import React from 'react';
// Content
import HeroContent from './content';

function Hero() {
  // Content
  const { text } = HeroContent;

  return (
    <div className='hero'>
      <div className='hero__image'></div>
      <div className='hero__content' dangerouslySetInnerHTML={{__html: text }} />
    </div>
  );
};

export default Hero;
