import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Hero: ComponentStyleConfig = {
  baseStyle: {
    ".hero-text-box": {
      w: { base: "full", md: "43%" },
      ml: { base: 0, md: "11%" },
      minWidth: "400px",
      maxWidth: { base: "full", md: "560px" },
      maxHeight: { md: "300px" },
      backgroundColor: { base: "brand.100", md: "brand.250" },
      color: { base: "brand.200", md: "brand.100" },
      padding: 4,
      position: "relative",
      cursor: "pointer",
      _hover: {
        h2: { textDecoration: "underline" },
        ".svg-wrapper": {
          border: "2px solid",
          borderColor: { base: "red.200", md: "brand.100" },
          borderRadius: "3xl",
        },
      },
      _focusWithin: {
        outlineStyle: "solid",
        outlineColor: "#135772",
        outlineWidth: "3px",
        boxShadow: "1px 1px 1px 1px #135772",
        h2: { textDecoration: "underline" },
        ".svg-wrapper": {
          border: "2px solid",
          borderColor: { base: "red.200", md: "brand.100" },
          borderRadius: "3xl",
        },
      },
    },
    h2: {
      fontSize: { base: "27px", xl: "4xl" },
      lineHeight: "normal",
      w: { base: "60%", md: "full" },
    },
    span: {
      display: "block",
      mb: 2.5,
      textTransform: "uppercase",
    },
    p: {
      py: 2.5,
      w: "90%",
      display: { base: "none", md: "block" },
      maxW: "300px",
    },
    a: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      _focus: {
        boxShadow: "unset",
        outline: "unset",
      },
    },
    ".svg-wrapper": {
      position: "absolute",
      right: { base: "6%", md: 1.5 },
      bottom: { base: 6, md: 1.5 },
      w: 9,
      h: 9,
      py: { base: "2px" },
      px: { base: "3px" },
      border: { base: "2px solid" },
      borderColor: { base: "red.200", md: "transparent" },
      borderRadius: { base: "3xl" },
    },
    img: {
      display: { base: "block", md: "none" },
      w: "full",
      maxHeight: { base: "390px" },
      objectFit: "cover",
      objectPosition: "center 0",
    },
  },
};

export default Hero;