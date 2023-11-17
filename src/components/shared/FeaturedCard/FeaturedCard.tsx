import * as React from "react";
import { Box, Flex, Heading, Link } from "@nypl/design-system-react-components";
import TextFormatted from "../../shared/TextFormatted";
import Image, { ImageType } from "../../shared/Image";

interface FeaturedCardProps {
  id: string;
  heading: string;
  description: string;
  image: ImageType;
  imageDirection: string;
  link: string;
  linkText: string;
  bgColor: string;
}

export default function FeaturedCard({
  id,
  heading,
  description,
  image,
  imageDirection,
  link,
  linkText,
  bgColor,
}: FeaturedCardProps) {
  return (
    <Flex
      id={id}
      marginBottom="xl"
      flexDirection={{ base: "column", lg: "row" }}
      flexWrap={{ base: "nowrap" }}
      alignItems="center"
      paddingX={{ base: "m", lg: "0" }}
      paddingY={{ base: "0", lg: "m" }}
      bgGradient={{
        base: `linear-gradient(to bottom, transparent 0, transparent 1.5rem, ${bgColor} 0)`,
        lg:
          imageDirection === "right"
            ? `linear-gradient(to left, transparent 0, transparent 1.5rem, ${bgColor} 0)`
            : `linear-gradient(to right, transparent 0, transparent 1.5rem, ${bgColor} 0)`,
      }}
    >
      <Box
        flexGrow={{ lg: 1 }}
        flexShrink={{ lg: 1 }}
        flexBasis={{ lg: "50%" }}
        padding="l"
        order={1}
      >
        <Heading level="two">
          <Link href={link}>{heading}</Link>
        </Heading>
        {<TextFormatted html={description} />}
        <Link width="fit-content" fontSize="sm" type="button" href={link}>
          {linkText}
        </Link>
      </Box>
      <Box
        w="100%"
        flexGrow={{ lg: 1 }}
        flexShrink={{ lg: 1 }}
        flexBasis={{ lg: "50%" }}
        order={{ lg: imageDirection === "right" ? 2 : undefined }}
      >
        <Image
          id={image.id}
          alt={image.alt}
          uri={image.uri}
          layout="responsive"
          width={image.width}
          height={image.height}
          quality={90}
          useTransformation={false}
          transformationLabel={""}
        />
      </Box>
    </Flex>
  );
}
