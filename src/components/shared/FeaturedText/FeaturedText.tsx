import React from "react";
import { Box, Heading } from "@nypl/design-system-react-components";
import TextFormatted from "./../TextFormatted";

interface FeaturedTextProps {
  id: string;
  type: string;
  heading?: string;
  text: string;
  bg: boolean;
}

function FeaturedText({ id, type, heading, text, bg }: FeaturedTextProps) {
  return (
    <Box
      id={`${type}-${id}`}
      mb="l"
      // This forces the component background to go full width, edge to edge.
      mx={{ sm: "-s", lg: "-50rem" }}
      bg={bg ? "ui.bg.default" : undefined}
    >
      <Box maxW="800px" px="s" py={{ sm: "s", lg: "xxl" }} margin="auto">
        {heading && <Heading level="two" text={heading} />}
        <TextFormatted html={text} />
      </Box>
    </Box>
  );
}

export default FeaturedText;
