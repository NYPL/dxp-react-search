import * as React from "react";
import { Box, Flex, Heading } from "@nypl/design-system-react-components";
import ButtonLink from "./../ButtonLink";
import { ButtonLinkProps as ButtonLinkItem } from "./../ButtonLink/ButtonLink";
import TextFormatted from "./../../shared/TextFormatted";

interface ButtonLinksProps {
  id: string;
  heading: string;
  description?: string;
  buttonType:
    | "buttonPrimary"
    | "buttonSecondary"
    | "buttonPill"
    | "buttonCallout";
  items: ButtonLinkItem[];
}

export default function ButtonLinks({
  id,
  heading,
  description,
  buttonType,
  items,
}: ButtonLinksProps) {
  return (
    <Box
      id={`social-media-block-${id}`}
      py="xl"
      mb="m"
      // This forces the component background to go full width, edge to edge.
      mx={{ sm: "-s", lg: "-50rem" }}
      bg="ui.bg.default"
    >
      <Box w="full" px="s" margin="auto">
        <Heading level="two" text={heading} textAlign="center" />
        {description && (
          <Box textAlign="center" pb="l">
            <TextFormatted html={description} />
          </Box>
        )}
        <Flex
          as="ul"
          direction={{ sm: "column", md: "row" }}
          gap="s"
          justify="center"
          m="auto"
          w={{ sm: "fit-content", md: "full" }}
        >
          {items &&
            items.map((item: ButtonLinkItem) => (
              <Box
                id={`button-link-${item.id}`}
                key={item.id}
                as="li"
                listStyleType="none"
                w={{ sm: "full", md: "fit-content" }}
              >
                <ButtonLink
                  id={item.id}
                  link={item.link}
                  icon={item.icon}
                  buttonType={buttonType}
                />
              </Box>
            ))}
        </Flex>
      </Box>
    </Box>
  );
}
