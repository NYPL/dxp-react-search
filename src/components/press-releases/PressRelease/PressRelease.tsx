import React from "react";
// Components
import Components, {
  ContentComponentObject,
} from "./../../shared/ContentComponents/getReactComponent";
import { Box, Heading } from "@nypl/design-system-react-components";
// Config/Utils
import pressContent from "./../../../__content/press";

interface PressReleaseProps {
  pressRelease: any;
}

function PressRelease({ pressRelease }: PressReleaseProps) {
  // Ensure line breaks from Drupal are respected. @QUESTION: is still needed fro subtitles?
  const subtitle = pressRelease.subtitle
    ? pressRelease.subtitle.replace(/\n/g, "<br/>")
    : null;

  const { about } = pressContent;
  const { mediaContacts } = pressContent;

  return (
    <Box as="article" w="100%" maxW="844px">
      <Box as="header" mb="l">
        <Heading level="one" size="secondary">
          {pressRelease.title}
        </Heading>
        {subtitle !== null && (
          <Box
            as="i"
            mb="s"
            fontSize={"1"}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        <Box mb="s">{pressRelease.date}</Box>
      </Box>
      <Box
        sx={{
          "& a": {
            textDecor: "underline",
          },
        }}
      >
        {pressRelease.mainContent &&
          pressRelease.mainContent.map(
            (contentComponent: ContentComponentObject) =>
              Components(contentComponent)
          )}
      </Box>
      <Box mb="l">
        <Heading level="two">{about.title}</Heading>
        <Box
          sx={{
            "& a": {
              color: "var(--nypl-colors-ui-black)",
              textDecor: "underline",
            },
          }}
          dangerouslySetInnerHTML={{ __html: about.description }}
        />
      </Box>
      {pressRelease.mediaContacts && (
        <Box>
          <Heading level="two">{mediaContacts.heading}</Heading>
          <Box
            sx={{
              "& a": {
                color: "var(--nypl-colors-ui-black)",
                textDecor: "underline",
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
