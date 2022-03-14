import React from "react";
// Components
import Components, {
  ContentComponentObject,
} from "./../../shared/ContentComponents/getReactComponent";
import {
  Box,
  Heading,
  HeadingLevels,
  HeadingDisplaySizes,
  Text,
  Link,
} from "@nypl/design-system-react-components";
import MediaContacts from "../layouts/MediaContacts";
// Config/Utils
import pressContent from "./../../../__content/press";

interface PressReleasePorps {
  pressRelease: any;
}

function PressRelease({ pressRelease }: PressReleasePorps) {
  // ensure line breaks from Drupal are respected
  const description = pressRelease.description
    ? pressRelease.description.replace(/\n/g, "<br/>")
    : null;
  // section for about NYPL
  const { about } = pressContent;
  const About = (
    <Box mb="l">
      <Heading level={HeadingLevels.Two} text={about.title} />
      <Text>
        {about.description}
        <Link
          href={about.url}
          additionalStyles={{
            color: "black",
            textDecor: "underline",
          }}
        >
          {about.anchorText}
        </Link>
      </Text>
    </Box>
  );

  return (
    <Box as="article" w="100%" maxW="844px">
      <Box as="header" mb="l">
        <Heading
          level={HeadingLevels.One}
          displaySize={HeadingDisplaySizes.Secondary}
          text={pressRelease.title}
        />
        {description !== null && (
          <Box
            isItalic={true}
            mb="s"
            fontSize={"1"}
            dangerouslySetInnerHTML={{ __html: description }}
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
      {About}
      <MediaContacts mediaContacts={pressRelease.mediaContacts} />
    </Box>
  );
}

export default PressRelease;
