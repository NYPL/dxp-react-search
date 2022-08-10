import * as React from "react";
// Components
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import Image from "./../../shared/Image";
import EventCard, { EventCardProps as EventItem } from "./EventCard";

interface EventCollectionTabPanelContentProps {
  id: string;
  events: EventItem[];
}

export default function EventCollectionTabPanelContent({
  id,
  events,
}: EventCollectionTabPanelContentProps) {
  // let featuredEvent: any;
  // events &&
  //   events.map((event) => {
  //     if (event.featured === true) {
  //       featuredEvent = event;
  //     }
  //   });

  // Sort events by weight.
  events.sort(function (a, b) {
    return a.weight - b.weight;
  });

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
      columnGap={{ base: 6, lg: 7 }}
      gap={{ base: 6, lg: 0 }}
      listStyleType="none"
    >
      <GridItem
        id={`${id}__featured-item`}
        as="li"
        display={{ base: "none", lg: "block" }}
        colStart={1}
        rowStart={1}
        rowEnd={{ base: 4, lg: 6 }}
      >
        {featuredEvent && (
          <Box textAlign="left">
            <a href={featuredEvent.link}>
              <Image
                id={featuredEvent.image.id}
                alt={featuredEvent.image.alt}
                uri={featuredEvent.image.uri}
                useTransformation={true}
                transformations={featuredEvent.image.transformations}
                transformationLabel={"2_1_960"}
                layout="responsive"
                width={900}
                height={450}
                quality={90}
              />
            </a>
            <Heading
              as="h3"
              fontFamily="Kievit-Medium"
              fontSize={{ base: "lg", md: "xl" }}
            >
              <a href={featuredEvent.link}>{featuredEvent.title}</a>
            </Heading>
            <Box>{featuredEvent.displayDate}</Box>
            <Box>{featuredEvent.location}</Box>
          </Box>
        )}
      </GridItem>
      {/* Desktop */}
      {events &&
        events.slice(0, 4).map((event, i) => {
          // @TODO what is this for?
          if (i === 0) return;
          return (
            <GridItem
              as="li"
              display={{ base: "none", lg: "block" }}
              colStart={2}
            >
              <EventCard {...event} />
            </GridItem>
          );
        })}
      {/* Tablet */}
      {events &&
        events.slice(0, 4).map((event) => {
          return (
            <GridItem
              as="li"
              display={{ base: "none", md: "block", lg: "none" }}
            >
              <EventCard {...event} />
            </GridItem>
          );
        })}
    </Grid>
  );
}
