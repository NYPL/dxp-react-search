import React from "react";
// Content
import HeroImage from "./HeroImage";
import HeroContent from "./content";

function Hero() {
  // Content
  const { text } = HeroContent;

  return (
    <div className="location-finder__hero">
      <div className="hero__inner">
        <div className="hero__image">
          <HeroImage />
        </div>
        <div
          className="hero__content"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}

export default Hero;
