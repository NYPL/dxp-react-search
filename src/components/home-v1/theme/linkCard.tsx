import type { ComponentStyleConfig } from "@chakra-ui/theme";

const LinkCard: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: {
    w: { base: "100vw", md: "auto" },
    fontFamily: "Kievit-Book",
    h3: {
      fontFamily: "Kievit-Book",
      fontSize: { base: "lg", md: "xl" },
      fontWeight: "normal",
      lineHeight: "none",
      px: { base: 0, md: "5%" },
    },
    a: { _hover: { textDecoration: "none" } },
    span: {
      fontSize: "sm",
      lineHeight: "none",
      px: { base: 0, md: "5%" },
      textTransform: "uppercase",
    },
    p: { fontSize: "sm", lineHeight: "none", px: { base: 0, md: "5%" } },
    img: { w: "100%" },
    gap: { base: 9, md: 4 },
  },
  // Styles for the size variations
  sizes: {
    xs: {
      h3: { fontSize: "lg" },
      span: { fontSize: "xs" },
    },
    sm: {
      h3: { fontSize: "lg" },
    },
    md: { h3: { fontSize: "xl" } },
    lg: { h3: { fontSize: "2xl" } },
    xl: { h3: { fontSize: "26px" } },
  },
  // Styles for the visual style variations
  variants: {
    "all-caps": {
      p: { textTransform: "uppercase" },
    },
    "event-spotlight": {
      gap: 1.5,
      fontFamily: "Kievit-Medium",
      fontWeight: "bold",
      textAlign: "left",
      h3: {
        fontFamily: "Kievit-Medium",
        px: 0,
      },
      span: { mt: 1.5, px: 0 },
      p: { px: 0 },
    },
    "event-card": {
      gap: { base: 6, lg: 4 },
      mb: { base: 0, lg: 4 },
      fontFamily: "Kievit-Medium",
      fontWeight: "bold",
      textAlign: "left",
      lineHeight: "21px",
      h3: {
        fontFamily: "Kievit-Medium",
        lineHeight: "22px",
        px: 0,
        mt: { base: 0, lg: 1.5 },
      },
      span: {
        mt: 1.5,
        px: 0,
        fontSize: { base: "xs", md: "xs" },
      },
      p: { px: 0, fontSize: "xs" },
    },
    "blog-card": {
      w: { base: "full", xl: "78vw" },
      maxWidth: { xl: "1130px" },
      gap: { base: 12, md: 0 },
      h3: {
        fontFamily: "Milo-Regular",
        lineHeight: "28px",
        fontSize: { base: "lg", md: "2xl" },
        fontWeight: "bold",
      },
      p: {
        display: { base: "none", lg: "block" },
        fontSize: "15px",
        pt: "10px",
      },
      img: { maxHeight: "280px", w: "auto", float: "right" },
    },
    "updates-card": {
      h3: { mt: "5px", mb: "15px" },
      p: { display: { base: "none", lg: "block" }, mb: "15px" },
      gap: { lg: 12 },
    },
  },
  // The default `size` or `variant` values
  defaultProps: { size: "md" },
};

export default LinkCard;
