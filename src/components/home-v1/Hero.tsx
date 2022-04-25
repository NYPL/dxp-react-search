import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
//Component
import { Box, Link, Heading, Text, Image } from "@chakra-ui/react";

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
        flex={{ base: 1, md: "0 0 73%" }}
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
              <svg
                viewBox="-2 -2 32 32"
                height="25px"
                width="25px"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
                role="img"
              >
                <title data-reactid="218">NYPL Right Arrow Icon</title>
                <polygon
                  points="16.959 25.998 27.298 15.707 16.959 5.417 15.026 7.397 22.08 14.548 4.688 14.548 4.687 16.963 22.08 16.963 15.026 24.065 16.959 25.998"
                  data-reactid="219"
                ></polygon>
              </svg>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
