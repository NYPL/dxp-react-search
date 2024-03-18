import * as React from "react";
import { Box, HStack, Link } from "@nypl/design-system-react-components";
import Heading from "../Heading";

export interface CardGridHeaderProps {
  id: string;
  title: string;
  headingColor?: string;
  link?: string;
  hrefText?: string;
}

export default function CardGridHeader({
  id,
  title,
  headingColor = "brand.primary",
  link,
  hrefText,
}: CardGridHeaderProps) {
  if (link && hrefText) {
    return (
      <Box mb=".75em">
        <HStack alignItems="baseline">
          <Heading id={id} level="h2" color={headingColor}>
            {title}
          </Heading>
          <Link href={link} type="standalone" color="#c60917">
            {hrefText}
          </Link>
        </HStack>
      </Box>
    );
  } else {
    return (
      <Heading id={id} level="h2" color={headingColor}>
        {title}
      </Heading>
    );
  }
}
