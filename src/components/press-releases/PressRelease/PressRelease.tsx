import React from "react";
// Components
import Components from "./../../shared/ContentComponents/getReactComponent";
import {
  Box,
  Heading,
  TextDisplaySizes,
  HeadingLevels,
  Text,
} from "@nypl/design-system-react-components";

interface PressReleasePorps {
  pressRelease: any;
}

function PressRelease({ pressRelease }: PressReleasePorps) {
  return (
    <Box as="article" w="100%" maxW="844px">
      <Box as="header" pb={10}>
        <Heading level={HeadingLevels.Two} text={"Heading (h2)"} />
        <Text displaySize={TextDisplaySizes.Default} isItalic={true}>
          Subheader
        </Text>
        <Box mb="xs">{"date"}</Box>
      </Box>
      Here is PressRelease Main Content
      {/* -> Might be using the same component? */}
      {/* {pressRelease.mainContent &&
        pressRelease.mainContent.map((contentComponent: ContentComponentObject) =>
          Components(contentComponent)
        )} */}
      <Box as="header" pb={10}>
        <Heading
          level={HeadingLevels.Two}
          text={"About the New York Public Library"}
        />
        <Text displaySize={TextDisplaySizes.Default}>Text</Text>
      </Box>
      <Box as="header" pb={10}>
        <Heading level={HeadingLevels.Two} text={"Media Contact"} />
        {/* {pressRelease.mediaContent && pressRelease.mediaContent.map((contact: any) => <SomeComponent/> )} */}
        <Text displaySize={TextDisplaySizes.Default}>Contact</Text>
      </Box>
    </Box>
  );
}

export default PressRelease;
