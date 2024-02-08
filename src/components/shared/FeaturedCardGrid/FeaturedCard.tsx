import * as React from "react";
import { Box, Heading, Link } from "@nypl/design-system-react-components";
import TextFormatted from "../../shared/TextFormatted";
import Image, { ImageType } from "../../shared/Image";

interface FeaturedCardProps {
  heading: string;
  description: string;
  image: ImageType;
  link: string;
  linkText: string;
  bgColor: string;
}

export default function FeaturedCard({
  heading,
  description,
  image,
  link,
  linkText,
}: FeaturedCardProps) {
  return (
    <>
      <Box order={1} padding="l" height="100%">
        <Heading level="two">
          {link ? <Link href={link}>{heading}</Link> : heading}
        </Heading>
        {<TextFormatted html={description} />}
        {linkText && (
          <Link width="fit-content" fontSize="sm" type="button" href={link}>
            {linkText}
          </Link>
        )}
      </Box>
      <Box>
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
    </>
  );
}
