import type { ComponentStyleConfig } from "@chakra-ui/theme";

const LinkCard: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: {
    gap: { base: 9, md: 4 },
    // title
    h3: {
      fontFamily: "Kievit-Book",
      fontSize: { base: "lg", md: "xl" },
      fontWeight: "normal",
      lineHeight: "none",
      px: { base: 0, md: "5%" },
    },
    // link
    a: { _hover: { textDecoration: "none" } },
    // date
    span: {
      fontSize: "sm",
      lineHeight: "none",
      px: { base: 0, md: "5%" },
      textTransform: "uppercase",
    },
    // description | location
    p: { fontSize: "sm", lineHeight: "none", px: { base: 0, md: "5%" } },
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
      gridTemplateColumns: { base: "3fr 7fr", md: "5fr 11fr", lg: "1fr 3fr" },
      gap: { base: 12, md: 6, lg: 4 },
      mb: { base: 0, lg: 4 },
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
        lineHeight: "21px",
        fontSize: "xs",
      },
    },
    "blog-card": {
      maxWidth: { xl: "1130px" },
      float: "right",
      gridTemplateColumns: {
        base: "1fr 2fr",
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
      img: { maxHeight: "280px", w: "auto", float: "right" },
    },
    "updates-card": {
      gridTemplateColumns: { base: "1fr 2fr", md: "2fr 1fr", lg: "1fr 1fr" },
      gap: { lg: 12 },
      mb: { lg: 16, xl: 10 },
      h3: { mt: 1.5, mb: 4 },
      p: { display: { base: "none", lg: "block" }, mb: 4 },
    },
  },
  // The default `size` or `variant` values
  defaultProps: { size: "md" },
};

export default LinkCard;
