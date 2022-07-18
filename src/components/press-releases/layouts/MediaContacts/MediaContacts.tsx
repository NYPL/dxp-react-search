import React from "react";
// Components
import { Heading, Box } from "@nypl/design-system-react-components";

function MediaContacts({ mediaContacts }: any) {
  const contacts = mediaContacts?.replace(/\n/g, "<br/>");
  return (
    <>
      <Heading level="two" text="Media Contacts" />
      <Box
        sx={{
          "& a": {
            color: "var(--nypl-colors-ui-black)",
            textDecor: "underline",
          },
        }}
        dangerouslySetInnerHTML={{ __html: contacts }}
      />
    </>
  );
}

export default MediaContacts;
