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
  Grid,
  GridItem,
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
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            columnGap={{ md: 8 }}
            rowGap={{ sm: 8, md: 0 }}
          >
            {promo_left.image.map((promoImageLeft) => {
              return (
                <GridItem key={promoImageLeft.link}>
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
                </GridItem>
              );
            })}
          </Grid>
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
          <Text size="body2">{promo_right.description}</Text>
          <Flex
            direction={{ sm: "column", md: "row" }}
            alignItems={{ sm: "center", md: undefined }}
            justify={{ md: "space-between", xl: "flex-start" }}
          >
            {promo_right.image.map((promoRightImage, index) => {
              return (
                <Box
                  key={promoRightImage.link}
                  {...(index === 0 && { mr: { ...{ xl: 16 } } })}
                  {...(index === 0 && { mb: { ...{ sm: 8, md: 0 } } })}
                >
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
