import React from "react";
// Component
import { Grid, GridItem } from "@chakra-ui/react";
import LinkCard, { Variant } from "../LinkCard";

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
      gap={{ base: 6, lg: 5, xl: 7 }}
      listStyleType="none"
    >
      <GridItem as="li" display={{ base: "none", lg: "block" }}>
        {events && (
          <LinkCard
            item={events[0]}
            variant={Variant.EventSpotlight}
            templateRows={"1fr 1fr"}
            size="xl"
          />
        )}
      </GridItem>
      <GridItem as="ul" display={{ base: "none", lg: "block" }}>
        {events &&
          events.map((event, i) => {
            if (i === 0) return;
            return (
              <LinkCard
                item={event}
                variant={Variant.EventCard}
                templateColumns={{ md: "1fr 2fr", lg: "1fr 3fr" }}
                size="sm"
              />
            );
          })}
      </GridItem>
      {events &&
        events.map((event) => {
          return (
            <GridItem display={{ base: "none", md: "block", lg: "none" }}>
              <LinkCard
                item={event}
                variant={Variant.EventCard}
                templateColumns={{ md: "5fr 11fr", lg: "1fr 3fr" }}
                size="sm"
              />
            </GridItem>
          );
        })}
    </Grid>
  );
}

export default FeaturedEvent;
