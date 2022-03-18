import React from "react";
// Content
import BottomPromoContent from "../../../__content/locationFinder";
// Components
import {
  Heading,
  HeadingLevels,
  Icon,
  IconSizes,
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
  ImageSizes,
} from "@nypl/design-system-react-components";
import image from "next/image";

function TestBottomPromo() {
  const { promo_left, promo_right } = BottomPromoContent;

  return (
    <Flex
      direction={["column", "column", "row"]}
      justify={"center"}
      mx={"calc(-50vw + 50%)"}
      mb="l"
      bgGradient={"linear(to-r,#FFFBF8,#f5f5f5 )"}
    >
      <Box bg={"#FFFBF8"} w={["65%", "65%", "40%"]} py={"1rem"} pr={"1rem"}>
        <Heading
          id="promo-left-section-title"
          level={HeadingLevels.Two}
          text={promo_left.title}
        />
        <Flex direction={["column", "column", "row"]} justify={"space-between"}>
          {promo_left.image.map((value, index) => {
            return (
              <Box
                key={value.link}
                mr={[`${index === image.length - 1 ? "20%" : ""}`, "0"]}
              >
                <Link href={value.link} className="promo-link">
                  <Image alt="" imageCaption={value.name} src={value.url} />
                </Link>
              </Box>
            );
          })}
        </Flex>
      </Box>
      <Box bg="#f5f5f5" w={["65%", "65%", "40%"]} py={"1rem"} pl={"1rem"}>
        <Heading
          id="promo-right-section-title"
          level={HeadingLevels.Two}
          text={promo_right.title}
        />
        <Text displaySize={TextDisplaySizes.Caption}>
          {promo_right.description}
        </Text>
        <Flex direction="row" justify={["space-between", "flex-start"]}>
          {promo_right.image.map((value, index) => {
            const typedLogoName = value.logo as LogoNames;
            return (
              <Box key={value.link}>
                <Link type={LinkTypes.Default}>
                  <a
                    aria-label={value.logo_alt}
                    href={value.link}
                    className="promo-link"
                  >
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
  );
}

export default TestBottomPromo;
