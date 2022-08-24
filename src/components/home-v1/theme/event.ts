import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Event: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: {
    w: "full",
    // Use gridGap instead of gap when not directly implemented within a <grid> tag { https://chakra-ui.com/docs/styled-system/features/style-props#grid-layout }
    gridGap: { base: 6, md: 4 },
    textAlign: "left",
    _focusWithin: {
      outlineStyle: "solid",
      outlineColor: "#135772",
      outlineWidth: "3px",
      boxShadow: "1px 1px 1px 1px #135772",
    },
    // Title
    h3: {
      fontFamily: "Kievit-Medium",
      fontSize: { base: "lg", md: "xl" },
      fontWeight: "normal",
      lineHeight: "none",
      px: 0,
    },
    // Link
    a: {
      _hover: { textDecoration: "none" },
      _focus: {
        boxShadow: "unset",
        outline: "unset",
      },
    },
    // Date
    span: {
      fontSize: "sm",
      lineHeight: "none",
      textTransform: "uppercase",
      px: 0,
    },
    // Description | Location
    p: { fontSize: "sm", lineHeight: "none", px: 0 },
    img: { w: "full" },
  },
  // Heading sizes
  sizes: {
    xs: {
      h3: { fontSize: "lg" },
    },
    sm: {
      h3: { fontSize: "lg" },
    },
    md: { h3: { fontSize: "xl" } },
    lg: { h3: { fontSize: "2xl" } },
    xl: { h3: { fontSize: "26px" } },
  },
  variants: {
    "event-card-featured": {
      gap: 1.5,
      h3: {
        mb: { lg: 3, xl: 0 },
      },
    },
    "event-card": {
      gridTemplateColumns: { base: "4fr 9fr", md: "5fr 11fr", lg: "1fr 3fr" },
      gridGap: { base: 9, md: 6, lg: 4 },
      mb: { base: 0, lg: 7 },
      h3: {
        lineHeight: "22px",
        mt: { base: 0, lg: 1.5 },
      },
      span: {
        mt: 1.5,
      },
      p: {
        fontSize: "xs",
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: { size: "md" },
};

export default Event;
