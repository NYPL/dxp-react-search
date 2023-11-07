import React from "react";
import { Box } from "@nypl/design-system-react-components";

interface TextFormattedProps {
  html: string;
}

function TextFormatted({ html }: TextFormattedProps) {
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
          textDecoration: "underline",
          _hover: {
            color: "var(--nypl-colors-ui-link-secondary) !important",
          },
        },
        "& h3": {
          fontWeight: "heading.tertiary",
          fontSize: "heading.tertiary",
          lineHeight: "1.25",
          marginTop: "0",
          marginLeft: "0",
          marginRight: "0",
          marginBottom: "s",
        },
        "& h4": {
          fontWeight: "heading.callout",
          fontSize: "heading.callout",
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
        "& hr": {
          bg: "ui.bg.hover",
          border: "0",
          height: "2px",
          marginBottom: "s",
          marginTop: "s",
          marginStart: 0,
          marginEnd: 0,
        },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default TextFormatted;
