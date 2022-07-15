import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import {
  Heading,
  Text,
  Link,
  Grid,
  GridItem,
  Image,
  Box,
} from "@chakra-ui/react";

export interface CardItem {
  id?: string;
  title: string;
  date?: string;
  description?: string;
  author?: string;
  genre?: string;
  audience?: string;
  location?: string;
  image: string;
  url?: string;
}

interface CardProps {
  item: CardItem;
  variant?:
    | "event-spotlight"
    | "event-card"
    | "slide-show-card"
    | "blog-card"
    | "updates-card";
  // size?: string | Record<string, string>;
  size?: any;
}

function Card({ item, variant, size = "md" }: CardProps) {
  // Get Card theme styles
  const styles = useStyleConfig("Card", { variant, size });
  // Generate describedBy string (used by Sideshow Card)
  let describedByIdsArray = [];
  const omitItems = ["id", "title", "image", "url"];
  for (const propName in item) {
    if (!omitItems.includes(propName)) {
      describedByIdsArray.push(`${item.id}-${propName}`);
    }
  }
  const describedByIdsString = describedByIdsArray.join(" ");

  return (
    <Grid
      templateRows={{ base: "1fr", md: "min-content" }}
      templateColumns={{ base: "5fr 9fr", md: "1fr" }}
      sx={styles}
    >
      <GridItem className="textBox">
        <Heading
          as="h3"
          {...(describedByIdsString && {
            "aria-describedby": describedByIdsString,
          })}
        >
          <Link href={item.url}>{item.title}</Link>
        </Heading>
        <Box className="details">
          {item.date && (
            <Text as="span" id={`${item.id}-date`}>
              {item.date}
            </Text>
          )}
          {item.description && (
            <Text id={`${item.id}-description`}>{item.description}</Text>
          )}
          {item.location && (
            <Text id={`${item.id}-location`}>{item.location}</Text>
          )}
          {item.author && <Text id={`${item.id}-author`}>{item.author}</Text>}
          {item.audience && (
            <Text as="span" id={`${item.id}-audience`}>
              {item.audience}
            </Text>
          )}
          {item.genre && (
            <Text as="span" id={`${item.id}-genre`}>
              {item.genre}
            </Text>
          )}
        </Box>
      </GridItem>
      <GridItem colStart={1} rowStart={1}>
        {/* @QUESTION Axe accessibility test requires aria-label for link here */}
        <Link href={item.url} aria-label={`${item.title}-image`} tabIndex={-1}>
          <Image
            src={item.image}
            // @QUESTION should role="presentation" be used instead of alte="" source: https://www.digitala11y.com/presentation-role/
            role="presentation"
            // @TODO discuss with Zach if there should be a empty alt attribute instead/alt information
            // alt={item.alt | ""}
          />
        </Link>
      </GridItem>
    </Grid>
  );
}

export default Card;
