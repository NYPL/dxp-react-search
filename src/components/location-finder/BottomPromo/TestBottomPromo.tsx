import React from "react";
// Content
import BottomPromoContent from "../../../__content/locationFinder";
// Components
import {
  Heading,
  Image,
  Link,
  Logo,
  LogoNames,
  Flex,
  Box,
  Text,
} from "@nypl/design-system-react-components";

function TestBottomPromo() {
  const { promo_left, promo_right } = BottomPromoContent;

  return (
    <Box
      mx={"calc(-50vw + 50%)"}
      mb="l"
      bgGradient={"linear(to-r,#FFFBF8,ui.gray.x-light-cool)"}
    >
      <Flex direction={{ sm: "column", md: "row" }} justify={{ xl: "center" }}>
        <Box
          bg="#FFFBF8"
          w={{ sm: "100%", md: "50%", xl: "624px" }}
          p={"var(--nypl-space-s)"}
          pl={{ sm: "var(--nypl-space-s)", xl: "0px" }}
        >
          <Heading
            id="promo-left-section-title"
            level="two"
            text={promo_left.title}
          />
          <Flex direction={{ sm: "column", md: "row" }}>
            {promo_left.image.map((promoImageLeft, index) => {
              return (
                <Box
                  key={promoImageLeft.link}
                  mr={{
                    sm: "20%",
                    md: `${
                      index === promo_left.image.length - 1 ? "0px" : null
                    }`,
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
                    {/* @QUESTION caption text on live site has size="caption" vs here it is set by the DS as size="tag",
                    see: https://github.com/NYPL/nypl-design-system/blob/development/src/theme/components/image.ts line: 96
                    AND caption text has underline styling when hover
                     */}
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
          <Heading
            id="promo-right-section-title"
            level="two"
            text={promo_right.title}
          />
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

export default TestBottomPromo;
