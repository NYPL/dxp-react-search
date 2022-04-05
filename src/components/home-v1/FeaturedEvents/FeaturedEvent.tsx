import React from "react";
// Component
import { Box, Grid, GridItem, Image, Heading, Text } from "@chakra-ui/react";
// Type
import { FeaturedEventItem } from "./FeaturedEventsTypes";

interface FeaturedEventProps {
  events: FeaturedEventItem[];
}

interface EventCardProps {
  event: FeaturedEventItem;
}

function EventSpotlightCard({ event }: EventCardProps) {
  const { title, date, location, image, link } = event;

  return (
    <Grid templateRows={"1fr 1fr"} display={{ base: "none", lg: "grid" }}>
      <GridItem as="a">
        <Image src={image} />
      </GridItem>
      <GridItem textAlign="left">
        <Heading
          as="h3"
          size="md"
          fontFamily="font.body"
          fontSize="26px"
          fontWeight="bold"
          mt="5px"
        >
          {title}
        </Heading>
        <Text mt="5px" fontSize="sm" lineHeight="none">
          {date}
        </Text>
        <Text fontSize="sm">{location}</Text>
      </GridItem>
    </Grid>
  );
}

function EventCard({ event }: EventCardProps) {
  const { title, date, location, image, link } = event;
  return (
    <Grid
      mb={{ base: "0px", lg: 4 }}
      as="li"
      templateColumns={{ base: "1fr 2fr", md: "", xl: "1fr 2fr" }}
      gap={{ base: 6, lg: 4 }}
      //   w={{ md: "33vw", lg: "auto" }}
    >
      <GridItem>
        <Image src={image} />
      </GridItem>
      <GridItem textAlign="left">
        <Heading
          as="h4"
          size="md"
          fontFamily="font.body"
          fontSize="18px"
          fontWeight="bold"
          mt="5px"
        >
          {title}
        </Heading>
        <Text mt="5px" fontSize="sm" lineHeight="none">
          {date}
        </Text>
        <Text fontSize="sm">{location}</Text>
      </GridItem>
    </Grid>
  );
}
function FeaturedEvent({ events }: FeaturedEventProps) {
  return (
    <Grid
      as="ul"
      templateColumns={{
        base: "1fr 1fr",
        lg: "4fr 7fr",
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
            <GridItem display={{ base: "grid", lg: "none" }}>
              <EventCard event={event} />
            </GridItem>
          );
        })}
    </Grid>
  );
}

export default FeaturedEvent;
