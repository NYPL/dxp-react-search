import React from "react";

/**
 * Custom hook that controls the sliding function for the slideshow wrapper.
 * This returns functions to use for the "previous" and "next" buttons as well
 * as a CSS style object that should be use to transition between slides.
 * Inspired by: the DS carousel hook and https://codesandbox.io/s/fxjeo
 */
const useSlideshowStyles = (slidesCount = 0, slideWidth = 100) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const prevSlide = () => {
    setCurrentSlide((slide) => (slide === 0 ? 0 : slide - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((slide) =>
      slide === slidesCount - 1 ? slidesCount - 1 : slide + 1
    );
  };
  /* Updates the left margin for the slideshow so the elements can slide inside
   the container. */
  const slideshowStyle = {
    transition: "all .5s",
    marginLeft: `-${currentSlide * slideWidth}%`,
  };
  return { currentSlide, prevSlide, nextSlide, slideshowStyle };
};

export default useSlideshowStyles;
