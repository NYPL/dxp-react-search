import React from "react";
// Component
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
import FeaturedEvent from "./FeaturedEvent";
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
      <Tabs
        align="end"
        variant="enclosed"
        mr={{ base: "35px", xl: "0px" }}
        borderColor="red.200"
      >
        <TabList borderBottomWidth="2px" pr={{ base: "70px", lg: "0px" }}>
          {items &&
            items.map((item) => (
              <Tab
                flex={{ base: 1, lg: "unset" }}
                py="10px"
                px="20px"
                w={{ lg: "15.5%", xl: "12.5%" }}
                textTransform="uppercase"
                overflowWrap={"break-word"}
                fontSize="12px"
                lineHeight="none"
                _selected={{
                  color: "red.200",
                  borderRadius: "none",
                  border: "2px solid ",
                  borderBottomColor: "brand.100",
                  mb: "-2px",
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
    </ComponentWrapper>
  );
}

export default FeaturedEvents;
