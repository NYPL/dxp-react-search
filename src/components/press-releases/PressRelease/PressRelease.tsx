import * as React from "react";
// Components
import { Box, Heading } from "@nypl/design-system-react-components";
import DrupalParagraphs from "../../shared/DrupalParagraphs";
import ImageComponent from "../../shared/ContentComponents/ImageComponent";
import Text from "../../shared/ContentComponents/Text";
import TextWithImage from "../../shared/ContentComponents/TextWithImage";
// Config/Utils
import pressContent from "./../../../__content/press";

interface PressReleaseProps {
  pressRelease: any;
}

export default function PressRelease({ pressRelease }: PressReleaseProps) {
  // Ensure line breaks from Drupal are respected.
  // @TODO: Determine if this is still needed for subTitle values.
  const subTitle = pressRelease.subTitle
    ? pressRelease.subTitle.replace(/\n/g, "<br/>")
    : null;

  //const { about } = pressContent;
  const { mediaContacts } = pressContent;

  return (
    <Box as="article" w="100%" maxW="844px">
      <Box as="header" mb="l">
        <Heading level="one" size="secondary">
          {pressRelease.title}
        </Heading>
        {subTitle !== null && (
          <Box
            as="i"
            mb="s"
            fontSize={"1"}
            dangerouslySetInnerHTML={{ __html: subTitle }}
          />
        )}
      </Box>
      <Box
        sx={{
          "& a": {
            textDecor: "underline",
          },
        }}
      >
        <DrupalParagraphs
          content={pressRelease.mainContent}
          components={{
            ImageComponent: ImageComponent,
            Text: Text,
            TextWithImage: TextWithImage,
          }}
        />
      </Box>
      {/* <Box mb="l">
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
      </Box> */}
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
