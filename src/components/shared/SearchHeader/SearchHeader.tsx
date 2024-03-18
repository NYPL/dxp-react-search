import React from "react";
import { Box } from "@nypl/design-system-react-components";
import Heading from "./../Heading";

interface SearchHeaderProps {
  headingId?: string;
  title?: string;
  children: React.ReactNode;
}

function SearchHeader({ headingId, title, children }: SearchHeaderProps) {
  return (
    <Box bg="ui.gray.x-light-cool" py="l">
      <Box maxWidth="1280px" w="100%" my="0" mx="auto" py="0" px="s">
        {title && (
          <Heading id={headingId} level="h1" size="heading3">
            {title}
          </Heading>
        )}
        {children}
      </Box>
    </Box>
  );
}

export default SearchHeader;
