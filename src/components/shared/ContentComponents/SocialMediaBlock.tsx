import * as React from "react";
import {
  Box,
  // Button,
  // ButtonGroup,
  Flex,
  Heading,
  Link,
  Icon,
  IconNames,
} from "@nypl/design-system-react-components";

type SocialMediaChannel = {
  title: string;
  link: string;
  icon: IconNames;
};

interface SocialMediaBlockProps {
  id: string;
  title: string;
  channels: SocialMediaChannel[];
}
export default function SocialMediaBlock({
  id,
  title,
  channels,
}: SocialMediaBlockProps) {
  return (
    <Box
      bg="ui.bg.default"
      id={`social-media-block-${id}`}
      mb="m"
      mx={{ sm: "-s", lg: "-25rem" }}
      py="xl"
    >
      <Box w="full" px="s" margin="auto">
        <Heading
          level="two"
          text={title}
          textAlign={{ sm: "left", md: "center" }}
        />
        <Flex
          as="ul"
          direction={{ sm: "column", md: "row" }}
          gap="20px"
          justify="center"
          m="auto"
          w={{ sm: "fit-content", md: "full" }}
        >
          {channels &&
            channels.map((channel: SocialMediaChannel) => (
              <Box
                as="li"
                listStyleType="none"
                w={{ sm: "full", md: "fit-content" }}
              >
                <Link
                  bg="transparent"
                  borderStyle="solid"
                  borderWidth="1px"
                  borderColor="ui.link.primary"
                  color="ui.link.primary"
                  href={channel.link}
                  id={`channel-button-${id}`}
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
                    name={channel.icon}
                    my="auto"
                    size="small"
                  />
                  {channel.title}
                </Link>
              </Box>
            ))}
        </Flex>
      </Box>
    </Box>
  );
}
