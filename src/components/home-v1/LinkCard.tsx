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

export interface LinkCardItem {
  id?: string;
  title: string;
  date?: string;
  description?: string;
  location?: string;
  image: string;
  url?: string;
}

interface LinkCardProps {
  item: LinkCardItem;
  variant?: Variant;
  size?: string | Record<string, string>;
}

function LinkCard({ item, variant, size = "md" }: LinkCardProps) {
  const styles = useStyleConfig("LinkCard", { variant, size });
  return (
    <Grid
      templateRows={{ base: "1fr", md: "min-content" }}
      templateColumns={{ base: "1fr 2fr", md: "1fr" }}
      sx={styles}
    >
      <GridItem>
        <Link href={item.url}>
          <Image src={item.image} />
        </Link>
      </GridItem>
      <GridItem>
        <Heading as="h3">
          <Link href={item.url}>{item.title}</Link>
        </Heading>
        <Link
          href={item.url}
          display="block"
          //@ts-ignore
          tabIndex="-1"
        >
          {item.date && <Text as="span">{item.date}</Text>}
          {item.description && <Text>{item.description}</Text>}
          {item.location && <Text>{item.location}</Text>}
        </Link>
      </GridItem>
    </Grid>
  );
}

export default LinkCard;
