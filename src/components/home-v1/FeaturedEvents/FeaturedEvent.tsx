import React from "react";
// Component
import { Grid, GridItem } from "@chakra-ui/react";
import Card, { Variant } from "../CardGrid/Card";

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
      gap={{ base: 6, lg: 7 }}
      listStyleType="none"
    >
      <GridItem as="li" display={{ base: "none", lg: "block" }}>
        {events && (
          <Card item={events[0]} variant={Variant.EventSpotlight} size="xl" />
        )}
      </GridItem>
      <GridItem as="ul" display={{ base: "none", lg: "block" }}>
        {events &&
          events.map((event, i) => {
            if (i === 0) return;
            return <Card item={event} variant={Variant.EventCard} size="sm" />;
          })}
      </GridItem>
      {events &&
        events.map((event) => {
          return (
            <GridItem display={{ base: "none", md: "block", lg: "none" }}>
              <Card item={event} variant={Variant.EventCard} size="sm" />
            </GridItem>
          );
        })}
    </Grid>
  );
}

export default FeaturedEvent;
