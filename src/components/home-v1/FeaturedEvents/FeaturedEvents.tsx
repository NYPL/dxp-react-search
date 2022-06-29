import React from "react";
// Component
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
} from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
import FeaturedEvent from "./FeaturedEvent";
import Card from "../CardGrid/Card";
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
        <Box as="ul" display={{ base: "block", md: "none" }}>
          {items &&
            items.map((item) => (
              <Box as="li" mb={8}>
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
                <Card item={item.events[0]} variant="event-card" size="xs" />
              </Box>
            ))}
        </Box>
        {/* desktop view */}
        <Tabs
          display={{ base: "none", md: "block" }}
          align="end"
          variant="enclosed"
          mr={{ md: 1, lg: 0 }}
          borderColor="red.200"
        >
          <TabList borderBottomWidth="2px">
            {items &&
              items.map((item) => (
                <Tab
                  flex={{ base: 1, lg: "unset" }}
                  py={2.5}
                  px={7}
                  w={{ lg: "15.5%", xl: "12%" }}
                  textTransform="uppercase"
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
                <TabPanel px={0} tabIndex={-1}>
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