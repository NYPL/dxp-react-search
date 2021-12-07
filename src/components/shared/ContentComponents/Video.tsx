import React from "react";
import { VideoPlayer } from "@nypl/design-system-react-components";

interface VideoProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  video: string;
}

function Video({ id, type, heading, description, video }: VideoProps) {
  return (
    <div>
      <div key={id}>
        <h3>{type}</h3>
        {id}
        <p>{video}</p>
      </div>
    </div>
  );
}

export default Video;
