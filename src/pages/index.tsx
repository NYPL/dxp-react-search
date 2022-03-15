import React from "react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import Meta from "./../components/shared/Meta";
import Hero from "./../components/home-v1/Hero";

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

const heroData = {
  title: "Women's History Month at NYPL",
  image: "https://www.nypl.org/sites/default/files/SASBopeng.jpg",
  description:
    "Join us all month long for new programs, book recommendations, and items from our collections that celebrate women past and present.",
  tag: "Celebrate",
};

function HomePage() {
  return (
    <>
      <Meta title="homepage!" description="homepage desc!" />
      <Box className="scout__homepage">
        <ChakraProvider theme={theme}>
          <Fonts />
          <main id="main-content">
            <Box id="content-header">
              <Hero
                title={heroData.title}
                description={heroData.description}
                image={heroData.image}
                tag={heroData.tag}
              />
            </Box>
            <Box
              id="content-primary"
              maxWidth="1313px"
              width="100%"
              margin="0 auto"
              padding="0 20px"
            >
              Content Primary!
            </Box>
          </main>
        </ChakraProvider>
      </Box>
    </>
  );
}

export default HomePage;
