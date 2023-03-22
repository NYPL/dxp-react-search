import * as React from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  Icon,
  IconNames,
} from "@nypl/design-system-react-components";

type ButtonLinkItem = {
  id: string;
  link: { title: string; url: string; uri: string };
  icon: string;
};

interface ButtonLinksProps {
  id: string;
  heading: string;
  description?: string;
  items: ButtonLinkItem[];
}

// Lookup table to match drupal strings to the corresponding DS IconNames
const IconTable: Record<string, IconNames> = {
  facebook: "legacySocialFacebook",
  instagram: "socialInstagram",
  twitter: "socialTwitter",
  file_type_doc: "fileTypeDoc",
};

export default function ButtonLinks({ id, heading, items }: ButtonLinksProps) {
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
                {/* @TODO once we are updating the DS version,
                replace custome style with type="buttonSecondary"*/}
                <Link
                  id={`link-${id}`}
                  href={item.link.url}
                  type="action"
                  w="full"
                  py="xs"
                  px="s"
                  textDecor="none"
                  color="ui.link.primary"
                  bg="transparent"
                  borderStyle="solid"
                  borderWidth="1px"
                  borderColor="ui.link.primary"
                  _hover={{
                    bg: "rgb(5, 118, 211,0.05 )",
                    borderColor: "ui.link.secondary",
                    color: "ui.link.secondary",
                    textDecor: "none",
                    svg: {
                      color: "ui.link.secondary",
                    },
                  }}
                >
                  <Icon
                    name={IconTable[item.icon]}
                    size="small"
                    align="left"
                    color="ui.link.primary"
                  />
                  {item.link.title}
                </Link>
              </Box>
            ))}
        </Flex>
      </Box>
    </Box>
  );
}
