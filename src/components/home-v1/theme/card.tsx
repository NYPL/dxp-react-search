import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Card: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: {
    w: "full",
    gap: { base: 9, md: 4 },
    _focusWithin: {
      outlineStyle: "solid",
      outlineColor: "#135772",
      outlineWidth: "3px",
      boxShadow: "1px 1px 1px 1px #135772",
    },
    // title
    h3: {
      fontFamily: "Kievit-Book",
      fontSize: { base: "lg", md: "xl" },
      fontWeight: "normal",
      lineHeight: "none",
      px: { base: 0, md: "5%" },
    },
    // link
    a: {
      _hover: { textDecoration: "none" },
      _focus: {
        boxShadow: "unset",
        outline: "unset",
      },
    },
    // date
    span: {
      fontSize: "sm",
      lineHeight: "none",
      px: { base: 0, md: "5%" },
      textTransform: "uppercase",
    },
    // description | location
    p: { fontSize: "sm", lineHeight: "none", px: { base: 0, md: "5%" } },
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
  // LinkCard variants
  variants: {
    "event-spotlight": {
      gap: 1.5,
      textAlign: "left",
      h3: {
        fontFamily: "Kievit-Medium",
        px: 0,
        mb: { lg: 3, xl: 0 },
      },
      span: { px: 0 },
      p: { px: 0 },
    },
    "event-card": {
      gridTemplateColumns: { base: "4fr 9fr", md: "5fr 11fr", lg: "1fr 3fr" },
      gap: { base: 12, md: 6, lg: 4 },
      mb: { base: 0, lg: 7 },
      textAlign: "left",

      h3: {
        fontFamily: "Kievit-Medium",
        lineHeight: "22px",
        px: 0,
        mt: { base: 0, lg: 1.5 },
      },
      span: {
        mt: 1.5,
        px: 0,
      },
      p: {
        px: 0,
        fontSize: "xs",
      },
    },
    "slide-show-card": {
      gridTemplateColumns: "1fr",
      gridTemplateRows: {
        base: "180px auto",
        md: "150px auto",
        lg: "190px auto",
        xl: "200px auto",
      },
      gap: 0,
      bg: "red.200",
      color: "brand.100",
      fontFamily: "Kievit-Book",
      w: { base: "166px", md: "143px", lg: "190px", xl: "212px" },
      h3: {
        fontFamily: "Kievit-Book",
        color: "brand.100",
        pt: 4,
        fontSize: {
          base: "lg",
          lg: "xl",
          xl: "1xl",
        },
        lineHeight: "none",
      },
      ".textBox": {
        px: { base: 3, lg: 2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      ".details": {
        mt: 2.5,
        mb: 1.5,
      },
      span: { display: "block", fontSize: "xs", lineHeight: "15px" },
      p: { mb: { base: 1.5, md: 4 } },
      img: {
        h: "full",
        objectFit: "cover",
        objectPosition: "15% 0%",
      },
    },
    "blog-card": {
      maxWidth: { xl: "1130px" },
      float: "right",
      gridTemplateColumns: {
        base: "4fr 9fr",
        md: "12fr 13fr",
        lg: "5fr 9fr",
        xl: "9fr 10fr",
      },
      gap: { base: 12, md: 0 },
      h3: {
        fontFamily: "Milo-Regular",
        lineHeight: "28px",
        fontSize: { base: "lg", md: "2xl" },
        fontWeight: "bold",
      },
      p: {
        display: { base: "none", lg: "block" },
        fontSize: "md",
        pt: 2.5,
      },
      img: { h: "full", maxHeight: "280px", w: "auto", float: "right" },
    },
    "updates-card": {
      gridTemplateColumns: { base: "4fr 9fr", md: "2fr 1fr", lg: "15fr 16fr" },
      gap: { base: 12 },
      fontFamily: "Kievit-Book",
      mb: { lg: 16, xl: 10 },
      h3: { mt: 1.5, mb: 4 },
      p: {
        display: { base: "none", lg: "block" },
        fontSize: "sm",
        lineHeight: "19px",
        mb: 4,
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: { size: "md" },
};

export default Card;
