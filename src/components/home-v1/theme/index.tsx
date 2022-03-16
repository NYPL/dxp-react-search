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
      `}
  />
);

const theme = extendTheme({
  fonts: {
    heading: "Milo-Regular",
    body: "Kievit-Medium",
  },
  colors: {
    brand: {
      100: "#FF0000",
      // ...
      900: "#1a202c",
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
