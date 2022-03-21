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
      bgGradient={"linear(to-r,#FFFBF8,#f5f5f5 )"}
    >
      <Flex
        direction={["column", null, "row"]}
        justify={[null, null, null, "center"]}
      >
        <Box
          bg="#FFFBF8"
          w={["100%", null, "50%", null, "624px"]}
          p={"1rem"}
          pl={["1rem", null, null, null, "0px"]}
        >
          <Heading
            id="promo-left-section-title"
            level={HeadingLevels.Two}
            text={promo_left.title}
          />
          <Flex direction={["column", null, "row"]}>
            {promo_left.image.map((value, index) => {
              return (
                <Box
                  key={value.link}
                  mr={[
                    "20%",
                    null,
                    `${index === image.length - 1 ? null : "0px"}`,
                  ]}
                  mb={["2rem", null, "0px"]}
                  w={["65%", null, "100%"]}
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
          w={["100%", null, "50%", null, "624px"]}
          p={"1rem"}
          ml={["calc(-50vw + 50%)", null, "0px"]}
        >
          <Heading
            id="promo-right-section-title"
            level={HeadingLevels.Two}
            text={promo_right.title}
          />
          <Text displaySize={TextDisplaySizes.Caption}>
            {promo_right.description}
          </Text>
          <Flex justify={[null, null, "space-between"]}>
            {promo_right.image.map((value, index) => {
              const typedLogoName = value.logo as LogoNames;
              return (
                <Box key={value.link} w={["50%", null, "40%"]}>
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
