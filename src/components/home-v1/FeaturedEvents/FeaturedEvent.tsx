import React from "react";
// Component
import { Grid, GridItem, Image, Heading, Text } from "@chakra-ui/react";
import { EventCard, EventSpotlightCard } from "./FeaturedEventCards";
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
        lg: "2fr 3fr",
        xl: "1fr 1fr",
      }}
      gap={{ base: 1, lg: 9 }}
      listStyleType="none"
      h={{ md: "300px", lg: "325px", xl: "423px" }}
      w={{ base: "78vw", xl: "full" }}
    >
      <GridItem as="li" display={{ base: "none", lg: "grid" }}>
        {events && <EventSpotlightCard event={events[0]} />}
      </GridItem>
      <GridItem as="ul" display={{ base: "none", lg: "block" }}>
        {events &&
          events.map((event, i) => {
            if (i === 0) return;
            return <EventCard event={event} />;
          })}
      </GridItem>
      {events &&
        events.map((event) => {
          return (
            <GridItem display={{ base: "none", md: "grid", lg: "none" }}>
              <EventCard event={event} />
            </GridItem>
          );
        })}
    </Grid>
  );
}

export default FeaturedEvent;
