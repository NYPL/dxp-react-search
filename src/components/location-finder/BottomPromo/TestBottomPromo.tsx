import React from "react";
// Content
import BottomPromoContent from "../../../__content/locationFinder";
// Components
import {
  Heading,
  HeadingLevels,
  Image,
  Link,
  LinkTypes,
  Logo,
  LogoNames,
  LogoSizes,
  Flex,
  Box,
  Text,
  TextDisplaySizes,
} from "@nypl/design-system-react-components";
import image from "next/image";

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
            level={HeadingLevels.Two}
            text={promo_left.title}
          />
          <Flex direction={{ sm: "column", md: "row" }}>
            {promo_left.image.map((value, index) => {
              return (
                <Box
                  key={value.link}
                  mr={{
                    sm: "20%",
                    md: `${index === image.length - 1 ? null : "0px"}`,
                  }}
                  mb={{ sm: "var(--nypl-space-l)", md: "0px" }}
                  w={{ sm: "65%", md: "100%" }}
                >
                  <Link
                    href={value.link}
                    textDecoration={"none"}
                    color={"ui.black"}
                  >
                    <Image alt="" imageCaption={value.name} src={value.url} />
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
            level={HeadingLevels.Two}
            text={promo_right.title}
          />
          <Text displaySize={TextDisplaySizes.Caption}>
            {promo_right.description}
          </Text>
          <Flex justify={{ md: "space-between" }}>
            {promo_right.image.map((value) => {
              const typedLogoName = value.logo as LogoNames;
              return (
                <Box key={value.link} w={{ sm: "50%", md: "40%" }}>
                  <Link type={LinkTypes.Default}>
                    <a aria-label={value.logo_alt} href={value.link}>
                      <Logo
                        // @ts-ignore
                        name={LogoNames[typedLogoName]}
                        size={LogoSizes.Small}
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
