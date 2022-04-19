import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Heading, Text, Link, Grid, GridItem, Image } from "@chakra-ui/react";

export enum Variant {
  EventSpotlight = "event-spotlight",
  EventCard = "event-card",
  BlogCard = "blog-card",
  Updates = "updates-card",
}

export interface CardItem {
  id?: string;
  title: string;
  date?: string;
  description?: string;
  location?: string;
  image: string;
  url?: string;
}

interface CardProps {
  item: CardItem;
  variant?: Variant;
  // size?: string | Record<string, string>;
  size?: any;
}

function Card({ item, variant, size = "md" }: CardProps) {
  const styles = useStyleConfig("Card", { variant, size });
  return (
    <Grid
      position="relative"
      templateRows={{ base: "1fr", md: "min-content" }}
      templateColumns={{ base: "1fr 2fr", md: "1fr" }}
      sx={styles}
    >
      <GridItem>
        <Image src={item.image} />
      </GridItem>
      <GridItem>
        <Heading as="h3">
          <Link href={item.url}>{item.title}</Link>
        </Heading>
        {/* <Link
          href={item.url}
          display="block"
          //@ts-ignore
          tabIndex="-1"
        > */}
        {item.date && <Text as="span">{item.date}</Text>}
        {item.description && <Text>{item.description}</Text>}
        {item.location && <Text>{item.location}</Text>}
        {/* </Link> */}
      </GridItem>
    </Grid>
  );
}

export default Card;
