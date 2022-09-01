import * as React from "react";

// Components
import { Grid, GridItem } from "@chakra-ui/react";
import EventCard, { EventCardProps as EventItem } from "./EventCard";

interface EventCollectionTabPanelContentProps {
  id: string;
  events: EventItem[];
}

export default function EventCollectionTabPanelContent({
  id,
  events,
}: EventCollectionTabPanelContentProps) {
  // Get only first 4 events.
  // Create a new array.

  // Get the first event as the featured event.
  const featuredEvent = events[0];

  return (
    <Grid
      id={id}
      as="ul"
      templateColumns={{
        base: "1fr 1fr",
        lg: "7fr 12fr",
        xl: "1fr 1fr",
      }}
      templateRows={{ base: "1fr", lg: "min-content min-content min-content" }}
      columnGap={{ base: 4, lg: 7 }}
      gap={{ base: 4, lg: 0 }}
      listStyleType="none"
    >
      {/* Desktop */}
      <GridItem
        id={`${id}__featured-item`}
        as="li"
        display={{ base: "none", lg: "block" }}
        colStart={1}
        rowStart={1}
        rowEnd={{ base: 4, lg: 6 }}
      >
        {featuredEvent && (
          <EventCard
            {...featuredEvent}
            variant="event-card-feaured"
            size="xl"
          />
        )}
      </GridItem>
      {events &&
        // Skip featured event item
        events.slice(1, 4).map((event, i) => {
          return (
            <GridItem
              as="li"
              key={`event-item-key-${i}`}
              display={{ base: "none", lg: "block" }}
              colStart={2}
            >
              <EventCard {...event} variant="event-card" />
            </GridItem>
          );
        })}
      {/* Tablet */}
      {events &&
        events.slice(0, 4).map((event, i) => {
          return (
            <GridItem
              as="li"
              key={`event-item-key-${i}`}
              display={{ base: "none", md: "block", lg: "none" }}
            >
              <EventCard {...event} variant="event-card" />
            </GridItem>
          );
        })}
    </Grid>
  );
}
