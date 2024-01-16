import * as React from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Link,
} from "@nypl/design-system-react-components";

export interface CardGridHeaderProps {
  id: string;
  title: string;
  headingColor?: string;
  link?: string;
  linkTitle?: string;
}

export default function CardGridHeader({
  id,
  title,
  headingColor = "brand.primary",
  link,
  linkTitle,
}: CardGridHeaderProps) {
  // @TODO cleanup the styling here, and use chakra/DS.
  return (
    <>
      {link && linkTitle ? (
        <HStack alignItems="baseline">
          <Heading id={id} level="two" text={title} color={headingColor} />
          <Link
            href={link}
            fontSize="small"
            fontWeight="700"
            color="brand.primary"
            textDecoration="none"
            paddingLeft="xs"
            _hover={{
              color: "brand.primary",
            }}
          >
            {linkTitle}
            <Box as="span" ml="xxs">
              <Icon
                size="small"
                name="arrow"
                decorative={true}
                iconRotation="rotate270"
                color="brand.primary"
              />
            </Box>
          </Link>
        </HStack>
      ) : (
        <Heading id={id} level="two" color={headingColor}>
          {title}
        </Heading>
      )}
    </>
  );
}
