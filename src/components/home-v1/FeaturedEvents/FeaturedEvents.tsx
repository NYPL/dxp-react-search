import React from "react";
// Component
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
import FeaturedEvent from "./FeaturedEvent";
import LinkCard, { Variant } from "../LinkCard";
// Type
import { FeaturedEventItem } from "./FeaturedEventsTypes";

interface FeaturedEventsProps {
  title: string;
  link: string;
  items: FeaturedEventsItem[];
}

interface FeaturedEventsItem {
  theme: string;
  events: FeaturedEventItem[];
}

function FeaturedEvents({ title, link, items }: FeaturedEventsProps) {
  return (
    <ComponentWrapper
      title={title}
      link={link}
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
      alignSectionHeading="46px"
      hoverStyle={true}
    >
      <Box>
        {/* mobile view */}
        <Box display={{ base: "block", md: "none" }}>
          {items &&
            items.map((item) => (
              <Box my={8}>
                <Heading
                  as="h3"
                  fontFamily="Kievit-Medium"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="red.200"
                  my={2.5}
                >
                  {item.theme}
                </Heading>
                <LinkCard
                  item={item.events[0]}
                  size="xs"
                  variant={Variant.EventCard}
                  templateColumns="1fr 2fr"
                />
              </Box>
            ))}
        </Box>
        {/* desktop view */}
        <Tabs
          display={{ base: "none", md: "block" }}
          align="end"
          variant="enclosed"
          mr={{ base: 9, xl: 0 }}
          borderColor="red.200"
        >
          <TabList borderBottomWidth="2px" pr={{ base: "70px", lg: 0 }}>
            {items &&
              items.map((item) => (
                <Tab
                  flex={{ base: 1, lg: "unset" }}
                  py={2.5}
                  px={5}
                  w={{ lg: "15.5%", xl: "12.5%" }}
                  textTransform="uppercase"
                  overflowWrap={"break-word"}
                  fontSize="xs"
                  lineHeight="none"
                  _selected={{
                    color: "red.200",
                    borderRadius: "none",
                    border: "2px solid ",
                    borderBottomColor: "brand.100",
                    mb: "-0.5",
                  }}
                >
                  {item.theme}
                </Tab>
              ))}
          </TabList>
          <TabPanels>
            {items &&
              items.map((item) => (
                <TabPanel px={0}>
                  <FeaturedEvent events={item.events} />
                </TabPanel>
              ))}
          </TabPanels>
        </Tabs>
      </Box>
    </ComponentWrapper>
  );
}

export default FeaturedEvents;
