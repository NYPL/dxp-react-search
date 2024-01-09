import React from "react";
// Content
import BottomPromoContent from "../../../__content/locationFinder";
// Components
import {
  Image,
  Link,
  Logo,
  LogoNames,
  Flex,
  Box,
  Text,
} from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";

function BottomPromo() {
  const { promo_left, promo_right } = BottomPromoContent;

  return (
    <Box
      mx={"calc(-50vw + 50%)"}
      mb="l"
      // @TODO figure out how use DS color values insetda if hex code
      // bgGradient={"linear(to-r,ui.gray.xx-light-cool,ui.gray.x-light-cool)"}
      bgGradient="linear(to-r, #FFFBF8, #F5F5F5)"
    >
      <Flex direction={{ sm: "column", md: "row" }} justify={{ xl: "center" }}>
        <Box
          bg="#FFFBF8"
          w={{ sm: "100%", md: "50%", xl: "624px" }}
          p={"var(--nypl-space-s)"}
          pl={{ sm: "var(--nypl-space-s)", xl: "0px" }}
        >
          <Heading id="promo-left-section-title" level="h2">
            {promo_left.title}
          </Heading>
          <Flex direction={{ sm: "column", md: "row" }}>
            {promo_left.image.map((promoImageLeft, index) => {
              return (
                <Box
                  key={promoImageLeft.link}
                  mr={{
                    sm: "20%",
                    // Omit margin right on second/last item
                    ...(index === promo_left.image.length - 1 && {
                      md: "0px",
                    }),
                  }}
                  mb={{ sm: "var(--nypl-space-l)", md: "0px" }}
                  w={{ sm: "65%", md: "100%" }}
                >
                  <Link
                    href={promoImageLeft.link}
                    sx={{
                      textDecor: "none",
                      color: "ui.black",
                    }}
                  >
                    <Image
                      alt=""
                      caption={promoImageLeft.name}
                      src={promoImageLeft.url}
                    />
                  </Link>
                </Box>
              );
            })}
          </Flex>
        </Box>
        <Box
          bg="ui.gray.x-light-cool"
          w={{ sm: "100%", md: "50%", xl: "624px" }}
          p={"var(--nypl-space-s)"}
          ml={{ sm: "calc(-50vw + 50%)", xl: "0px" }}
        >
          <Heading id="promo-right-section-title" level="h2">
            {promo_right.title}
          </Heading>
          <Text size="caption">{promo_right.description}</Text>
          <Flex justify={{ md: "space-between" }}>
            {promo_right.image.map((promoRightImage) => {
              return (
                <Box key={promoRightImage.link} w={{ sm: "50%", md: "40%" }}>
                  <Link type="default">
                    <a
                      aria-label={promoRightImage.logo_alt}
                      href={promoRightImage.link}
                    >
                      <Logo
                        name={promoRightImage.logo as LogoNames}
                        size="small"
                      />
                    </a>
                  </Link>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default BottomPromo;
