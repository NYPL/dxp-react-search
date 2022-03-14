import React from "react";
import {
  Heading,
  HeadingLevels,
  Box,
} from "@nypl/design-system-react-components";
function MediaContacts({ mediaContacts }: any) {
  const contacts = mediaContacts.replace(/\n/g, "<br/>");
  return (
    <>
      <Heading level={HeadingLevels.Two} text="Media Contacts" />
      <Box
        sx={{
          "& a": {
            color: "black",
            textDecor: "underline",
          },
        }}
        dangerouslySetInnerHTML={{ __html: contacts }}
      />
    </>
  );
}

export default MediaContacts;
