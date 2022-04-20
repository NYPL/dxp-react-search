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
  const styles = useStyleConfig("Card", { variant, size });
  const ariaDescription = `${item.date ? `${item.date}` : ""} ${
    item.location ? `at ${item.location}` : ""
  } ${item.description ? `${item.description}` : ""}`;
  return (
    <Grid
      templateRows={{ base: "1fr", md: "min-content" }}
      templateColumns={{ base: "5fr 9fr", md: "1fr" }}
      sx={styles}
    >
      <GridItem>
        <Heading as="h3" aria-description={ariaDescription}>
          <Link href={item.url}>{item.title} </Link>
        </Heading>
        <Box>
          {item.date && <Text as="span">{item.date}</Text>}
          {item.description && <Text>{item.description}</Text>}
          {item.location && <Text>{item.location}</Text>}
          {item.author && <Text>{item.author}</Text>}
          {item.audience && <Text as="span">{item.audience}</Text>}
          {item.genre && <Text as="span">{item.genre}</Text>}
        </Box>
      </GridItem>
      <GridItem colStart={1} rowStart={1}>
        <Image src={item.image} />
      </GridItem>
    </Grid>
  );
}

export default Card;
