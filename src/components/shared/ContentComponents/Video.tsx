import React from "react";
import {
  VideoPlayer,
  VideoPlayerTypes,
} from "@nypl/design-system-react-components";

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

      {/*<VideoPlayer
        id={id}
        videoId={video}
        videoType={VideoPlayerTypes.YouTube}
      />
      */}
    </div>
  );
}

export default Video;
