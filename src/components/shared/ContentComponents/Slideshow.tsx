import React from "react";

interface SlideshowProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
}

function Slideshow({ id, type, heading, description }: SlideshowProps) {
  //console.log(VideoProps);
  return (
    <div key={id}>
      <h3>{type}</h3>
      {id}
      <p>{heading}</p>
    </div>
  );
}

export default Slideshow;
