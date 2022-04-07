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
import Card from "../TempletCard";
// Type
import { FeaturedEventItem } from "./FeaturedEventsTypes";

interface FeaturedEventsProps {
  title: string;
  items: FeaturedEventsItem[];
}

interface FeaturedEventsItem {
  theme: string;
  events: FeaturedEventItem[];
}

function FeaturedEvents({ title, items }: FeaturedEventsProps) {
  return (
    <ComponentWrapper
      title={title}
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
      alignSectionHeading="46px"
    >
      <Box>
        {/* mobile view */}
        <Box display={{ base: "block", md: "none" }}>
          {items &&
            items.map((item) => (
              <Card image={item.events[0].image} title={item.theme}>
                <Box>
                  <Heading
                    as="h3"
                    fontFamily="font.body"
                    fontSize="lg"
                    fontWeight="bold"
                    mt={1.5}
                  >
                    {item.events[0].title}
                  </Heading>
                  <Text mt={1.5} fontSize="xs" lineHeight="none">
                    {item.events[0].date}
                  </Text>
                  <Text mt={1.5} fontSize="xs">
                    {item.events[0].location}
                  </Text>
                </Box>
              </Card>
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
