import React from "react";
import { Box } from "@nypl/design-system-react-components";
import { ChakraStyledOptions } from "@chakra-ui/react";

interface TextFormattedProps extends ChakraStyledOptions {
  html: string;
}

function TextFormatted({ html, ...rest }: TextFormattedProps) {
  return (
    <Box
      sx={{
        "& ul": {
          paddingLeft: "s",
          paddingBottom: "s",
        },
        "& ol": {
          paddingLeft: "s",
          paddingBottom: "s",
        },
        "& a": {
          color: "var(--nypl-colors-ui-link-primary) !important",
          textDecoration: "underline dotted",
          textUnderlineOffset: "2px",
          textDecorationThickness: "1px",
          _hover: {
            color: "var(--nypl-colors-ui-link-secondary) !important",
          },
        },
        "& h3": {
          fontWeight: "var(--nypl-fontWeights-heading-heading5)",
          fontSize: "var(--nypl-fontSizes-desktop-heading-heading5)",
          lineHeight: "1.25",
          marginTop: "0",
          marginLeft: "0",
          marginRight: "0",
          marginBottom: "s",
        },
        "& h4": {
          fontWeight: "var(--nypl-fontWeights-heading-heading6)",
          fontSize: "var(--nypl-fontSizes-desktop-heading-heading6)",
          lineHeight: "1.15",
          marginTop: "0",
          marginLeft: "0",
          marginRight: "0",
          marginBottom: "s",
        },
        "& h5": {
          fontWeight: "regular",
          fontSize: "1",
          lineHeight: "1.15",
          marginTop: "0",
          marginLeft: "0",
          marginRight: "0",
          marginBottom: "s",
        },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}

export default TextFormatted;
