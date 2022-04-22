import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  HeadingSizes,
} from "@nypl/design-system-react-components";

interface SearchHeaderProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function SearchHeader({ id, title, children }: SearchHeaderProps) {
  return (
    <Box bg="ui.gray.x-light-cool" py="l">
      <Box maxWidth="1280px" w="100%" my="0" mx="auto" py="0" px="s">
        {title && (
          <Heading
            id={id}
            level={HeadingLevels.One}
            size={HeadingSizes.Secondary}
            text={title}
          />
        )}
        {children}
      </Box>
    </Box>
  );
}

export default SearchHeader;
