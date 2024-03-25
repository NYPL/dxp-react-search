import * as React from "react";
// Components
import { Box } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
// Paragraphs
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
      <DrupalParagraphs
        content={pressRelease.mainContent}
        components={{
          ImageComponent: ImageComponent,
          Text: Text,
          TextWithImage: TextWithImage,
        }}
      />
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
