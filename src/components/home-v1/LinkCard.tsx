import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Heading, Text, Link, Grid, GridItem, Image } from "@chakra-ui/react";

export enum Variant {
  AllCaps = "all-caps",
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
  link?: string;
}

interface LinkCardProps {
  item: LinkCardItem;
  variant?: Variant;
  size?: string | Record<string, string>;
  gap?: string | Record<string, string>;
  templateColumns?: string | Record<string, string>;
  templateRows?: string | Record<string, string>;
}

function LinkCard({
  item,
  variant,
  size,
  templateColumns,
  templateRows,
  gap,
}: LinkCardProps) {
  const styles = useStyleConfig("LinkCard", { variant, size, gap });
  return (
    <Grid
      as="li"
      templateRows={
        templateRows !== undefined
          ? templateRows
          : { base: "1fr", md: "min-content" }
      }
      templateColumns={
        templateColumns !== undefined
          ? templateColumns
          : { base: "1fr 2fr", md: "1fr" }
      }
      sx={styles}
    >
      <GridItem>
        <Link href={item.link}>
          <Image src={item.image} />
        </Link>
      </GridItem>
      <GridItem>
        <Heading as="h3">
          <Link href={item.link}>{item.title}</Link>
        </Heading>
        {item.date && <Text as="span">{item.date}</Text>}
        {item.description && <Text>{item.description}</Text>}
        {item.location && <Text>{item.location}</Text>}
      </GridItem>
    </Grid>
  );
}

export default LinkCard;
