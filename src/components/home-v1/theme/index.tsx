import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

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
        font-family: 'Milo-Regular';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://d2znry4lg8s0tq.cloudfront.net/milo-web/milo-slab-pro-regular/MiloSlabWebPro.woff') format('woff2')
      }
      @font-face {
        font-family: 'Kievit-Book';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://ux-static.nypl.org/ff_kievit_web/KievitWeb-Book.woff') format('woff2')
      }
      /* does not work */
      @font-face {
        font-family: 'nypl-moon';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://ux-static.nypl.org/ff_nypl_web/nypl-moon.woff') format('woff2')
      }
      `}
  />
);

const theme = extendTheme({
  fonts: {
    heading: "Milo-Regular",
    body: "Kievit-Medium",
  },
  colors: {
    red: {
      100: "#B80F15",
      200: "#E32B31",
      300: "#e32a30",
    },
    brand: {
      //white
      100: "#FFFFFF",
      // ...
      900: "#1a202c",
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
  spacing: {
    space: {
      //58px
      //60px
      //70px
      //110px
      //120px
      //125px
      //130px
      //140px
      //150px
      //175px
      //215px
      //360px
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
