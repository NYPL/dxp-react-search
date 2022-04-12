import React from "react";
// Component
import { Grid, GridItem, Image, Heading, Text } from "@chakra-ui/react";
// Type
import { FeaturedEventItem } from "./FeaturedEventsTypes";

interface EventCardProps {
  event: FeaturedEventItem;
}

function EventSpotlightCard({ event }: EventCardProps) {
  const { title, date, location, image, link } = event;

  return (
    <Grid templateRows={"1fr 1fr"} gap={1.5}>
      <GridItem>
        <Image src={image} />
      </GridItem>
      <GridItem textAlign="left">
        <Heading
          as="h3"
          fontFamily="font.body"
          fontSize="26px"
          fontWeight="bold"
        >
          {title}
        </Heading>
        <Text mt={1.5} fontSize="sm" lineHeight="none">
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
      mb={{ base: 0, lg: 4 }}
      as="li"
      templateColumns={{
        md: "1fr 2fr",
        lg: "1fr 3fr",
      }}
      gap={{ base: 6, lg: 4 }}
    >
      <GridItem>
        <Image src={image} />
      </GridItem>
      <GridItem textAlign="left">
        <Heading
          as="h3"
          size="md"
          fontFamily="font.body"
          fontSize="lg"
          fontWeight="bold"
          mt={1.5}
        >
          {title}
        </Heading>
        <Text mt={1.5} fontSize="sm" lineHeight="none">
          {date}
        </Text>
        <Text fontSize="sm">{location}</Text>
      </GridItem>
    </Grid>
  );
}

export { EventCard, EventSpotlightCard };
