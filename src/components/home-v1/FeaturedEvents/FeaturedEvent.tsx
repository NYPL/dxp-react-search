import React from "react";
// Component
import { Grid, GridItem } from "@chakra-ui/react";
import Card from "../CardGrid/Card";

// Type
import { FeaturedEventItem } from "./FeaturedEventsTypes";

interface FeaturedEventProps {
  events: FeaturedEventItem[];
}

function FeaturedEvent({ events }: FeaturedEventProps) {
  return (
    <Grid
      as="ul"
      templateColumns={{
        base: "1fr 1fr",
        lg: "7fr 12fr",
        xl: "1fr 1fr",
      }}
      templateRows={{ base: "1fr", lg: "min-content min-content min-content" }}
      columnGap={{ base: 6, lg: 7 }}
      gap={{ base: 6, lg: 0 }}
      listStyleType="none"
    >
      <GridItem
        as="li"
        display={{ base: "none", lg: "block" }}
        colStart={1}
        rowStart={1}
        rowEnd={{ base: 4, lg: 6 }}
      >
        {events && (
          <Card item={events[0]} variant="event-spotlight" size="xl" />
        )}
      </GridItem>
      {events &&
        events.map((event, i) => {
          if (i === 0) return;
          return (
            <GridItem
              as="li"
              display={{ base: "none", lg: "block" }}
              colStart={2}
            >
              <Card item={event} variant="event-card" size="sm" />
            </GridItem>
          );
        })}
      {events &&
        events.map((event) => {
          return (
            <GridItem
              as="li"
              display={{ base: "none", md: "block", lg: "none" }}
            >
              <Card item={event} variant="event-card" size="sm" />
            </GridItem>
          );
        })}
    </Grid>
  );
}

export default FeaturedEvent;
