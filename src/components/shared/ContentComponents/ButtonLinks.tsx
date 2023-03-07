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
  description?: any;
  items: ButtonLinkItem[];
}

const IconTable: Record<string, IconNames> = {
  facebook: "legacySocialFacebook",
  instagram: "socialInstagram",
  twitter: "socialTwitter",
  file_type_doc: "fileTypeDoc",
};

export default function ButtonLinks({ id, heading, items }: ButtonLinksProps) {
  return (
    <Box
      bg="ui.bg.default"
      id={`social-media-block-${id}`}
      mb="m"
      mx={{ sm: "-s", lg: "-25rem" }}
      py="xl"
    >
      <Box w="full" px="s" margin="auto">
        <Heading level="two" text={heading} textAlign="center" />
        <Flex
          as="ul"
          direction={{ sm: "column", md: "row" }}
          gap="20px"
          justify="center"
          m="auto"
          w={{ sm: "fit-content", md: "full" }}
        >
          {items &&
            items.map((item: ButtonLinkItem) => (
              <Box
                as="li"
                listStyleType="none"
                w={{ sm: "full", md: "fit-content" }}
              >
                {/* @TODO once we are updating the DS version,
                replace custome style with type="buttonSecondary"*/}
                <Link
                  bg="transparent"
                  borderStyle="solid"
                  borderWidth="1px"
                  borderColor="ui.link.primary"
                  color="ui.link.primary"
                  href={item.link.url}
                  id={`item-button-${id}`}
                  p="8px 16px"
                  textDecor="none"
                  type="action"
                  w="full"
                  _hover={{
                    bg: "rgb(5, 118, 211,0.05 )",
                    borderColor: "ui.link.secondary",
                    color: "ui.link.secondary",
                    textDecor: "none",
                  }}
                >
                  <Icon
                    align="left"
                    color="ui.link.primary"
                    name={IconTable[item.icon]}
                    my="auto"
                    size="small"
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
