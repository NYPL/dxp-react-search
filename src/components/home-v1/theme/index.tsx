import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
// Component Styles
import QuoteBg from "./quoteBg";

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Kievit-Medium';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://ux-static.nypl.org/ff_kievit_web/KievitWeb-Medi.woff') format('woff2')
      }
      @font-face {
        font-family: 'Kievit-Book';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://ux-static.nypl.org/ff_kievit_web/KievitWeb-Book.woff') format('woff2')
      }
      @font-face {
        font-family: 'Milo-Regular';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://d2znry4lg8s0tq.cloudfront.net/milo-web/milo-slab-pro-regular/MiloSlabWebPro.woff') format('woff2')
      }
      @font-face {
        font-family: 'Milo-Light';
        font-style: normal;
        font-weight: 700;
        src: url('https://d2znry4lg8s0tq.cloudfront.net/milo-web/milo-slab-pro-light/MiloSlabWebPro.woff') format('woff2')
      }
      /* does not work */
      @font-face {
        font-family: 'nypl-moon';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://ux-static.nypl.org/ff_nypl_moon/nypl-moon.woff') format('woff2')
      }
      `}
  />
);

const theme = extendTheme({
  fonts: {
    heading: "Milo-Regular",
    body: "Kievit-Medium",
  },
  fontSizes: {
    //xs: "0.75rem", -> 12px
    //sm: "0.875rem", -> 14
    //md: "1rem", -> 16px
    //lg: "1.125rem", -> 18px
    //xl: "1.25rem", -> 20px
    "1xl": "1.375rem", // -> 22px
    //2xl: "1.5rem", -> 24px
    "2.5xl": "1.75rem", //-> 28px
    //"3xl": "1.875rem", -> 30px
    //"4xl": "2.25rem", -> 36px
  },
  colors: {
    red: {
      100: "#B80F15",
      200: "#E32B31",
    },
    brand: {
      // white
      100: "#FFFFFF",
      // black
      200: "#000000",
      900: "transparent",
    },
  },
  breakpoints: {
    // 768px
    md: "768px",
    // 1024px
    lg: "1024px",
    // 1280px
    xl: "1313px",
  },
  components: {
    Heading: {
      variants: {
        "section-title": {
          fontWeight: "bold",
          fontFamily: "fonts.body",
          textAlign: { base: "left", md: "right" },
          borderTop: "2px solid",
        },
      },
    },
    Link: {
      variants: {
        "see-more": {
          pt: 3.5,
          pb: 3,
          px: 5,
          textAlign: "center",
          borderRadius: "3xl",
        },
      },
    },
    Button: {
      variants: {
        "slide-show": (props: any) => ({
          float: { md: "left" },
          color: "brand.100",
          border: "2px",
          borderColor: "brand.100",
          borderRadius: "full",
          fontSize: "3xl",
          bg: "transparent",
          h: 9,
          w: 9,
          minWidth: "unset",
          ml: {
            base: props.direction === "prev" ? "40vw" : "55vw",
            md: props.direction === "prev" ? "-120px" : "-60px",
            lg: props.direction === "prev" ? "-110px" : "-60px",
          },
          mt: {
            md: props.direction === "prev" ? "125px" : "-175px",
            lg: props.direction === "prev" ? "125px" : "-215px",
          },
          top: {
            base: props.direction === "prev" ? "362px" : 4,
            md: 0,
          },
        }),
      },
    },
    QuoteBg,
  },
  spacing: {
    space: {
      //58px
      //60px
      //70px
      //75px
      //110px
      //115px
      //120px
      //125px
      //130px
      //140px
      //150px
      ///153px
      //175px
      //212px
      //215px
      //233px
      //300px
      //310px
      //325px
      //360px
      //423px
    },
  },
});

function ScoutHomepageV1Provider({ children }: { children: JSX.Element }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      {children}
    </ChakraProvider>
  );
}

export default ScoutHomepageV1Provider;
