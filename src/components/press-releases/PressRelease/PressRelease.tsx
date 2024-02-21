import React from "react";
// Components
import Components, {
  ContentComponentObject,
} from "./../../shared/ContentComponents/getReactComponent";
import { Box } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
// Config/Utils
import pressContent from "./../../../__content/press";

interface PressReleaseProps {
  pressRelease: any;
}

function PressRelease({ pressRelease }: PressReleaseProps) {
  // Ensure line breaks from Drupal are respected.
  // @TODO: Determine if this is still needed for subTitle values.
  const subTitle = pressRelease.subTitle
    ? pressRelease.subTitle.replace(/\n/g, "<br/>")
    : null;

  const { mediaContacts } = pressContent;

  return (
    <Box as="article" w="100%" maxW="844px">
      <Box as="header" mb="l">
        <Heading
          level="h1"
          size="heading2"
          {...(subTitle !== null && {
            subtitle: <Box dangerouslySetInnerHTML={{ __html: subTitle }} />,
          })}
        >
          {pressRelease.title}
        </Heading>
      </Box>
      {pressRelease.mainContent &&
        pressRelease.mainContent.map(
          (contentComponent: ContentComponentObject) =>
            Components(contentComponent)
        )}
      {pressRelease.mediaContacts && (
        <Box>
          <Heading level="h2">{mediaContacts.heading}</Heading>
          <Box
            sx={{
              "& a": {
                color: "var(--nypl-colors-ui-black)",
                textDecor: "underline dotted",
                textUnderlineOffset: "2px",
                textDecorationThickness: "1px",
              },
            }}
            dangerouslySetInnerHTML={{ __html: pressRelease.mediaContacts }}
          />
        </Box>
      )}
    </Box>
  );
}

export default PressRelease;
