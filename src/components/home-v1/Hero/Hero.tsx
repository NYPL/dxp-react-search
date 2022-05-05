import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Component
import { Box, Link, Heading, Text, Image, createIcon } from "@chakra-ui/react";

// SVG Icon
const RightArrowIcon = createIcon({
  displayName: "RightArrow",
  viewBox: "-2 -2 32 32",
  path: (
    <polygon points="16.959 25.998 27.298 15.707 16.959 5.417 15.026 7.397 22.08 14.548 4.688 14.548 4.687 16.963 22.08 16.963 15.026 24.065 16.959 25.998" />
  ),
});

interface HeroProps {
  title: string;
  description: string;
  tag: string;
  image?: string;
  mobileImg?: string;
  url: string;
}

function Hero({ title, description, tag, image, mobileImg, url }: HeroProps) {
  const styles = useStyleConfig("Hero");
  return (
    <Box
      alignItems="center"
      display="flex"
      flexFlow="row nowrap"
      justifyContent="center"
      height={{ md: "30vw" }}
      maxHeight={{ xl: "400px" }}
      minHeight="250px"
      bgImage={{ base: "none", md: `url(${image})` }}
      bgSize="cover"
    >
      <Box
        flex={{ base: 1, md: "1 0 70%" }}
        maxWidth="1313px"
        mx={0}
        my="auto"
        _focus={{
          boxShadow: "unset",
          outline: "unset",
        }}
        sx={styles}
      >
        <Image src={mobileImg} />
        <Box className="hero-text-box">
          <Link
            href={url}
            aria-label={`${tag}, link to ${title}, ${description}`}
          />
          <Box as="span">{tag}</Box>
          <Heading>{title}</Heading>
          <Text>{description}</Text>
          <Box h={{ base: 0, md: "25px" }} position="relative">
            <Box className="svg-wrapper">
              <RightArrowIcon
                h="25px"
                w="25px"
                fill={{ base: "red.200", md: "brand.100" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
