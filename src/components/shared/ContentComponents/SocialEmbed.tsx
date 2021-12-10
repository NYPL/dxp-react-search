import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";

interface SocialEmbedProps {
  id: string;
  type: string;
  embedCode: string;
}
function SocialEmbed({ id, type, embedCode }: SocialEmbedProps) {
  return (
    <div id={id} style={{ width: "100%", marginBottom: "3rem" }}>
      <div dangerouslySetInnerHTML={{ __html: embedCode }} />
    </div>
  );
}

export default SocialEmbed;
