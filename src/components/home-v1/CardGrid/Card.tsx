import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Heading, Text, Link, Grid, GridItem, Box } from "@chakra-ui/react";
import Image from "./../../shared/Image";

export interface CardItem {
  id?: string;
  title: string;
  date?: string;
  description?: string;
  author?: string;
  genre?: string;
  audience?: string;
  location?: string;
  image: any;
  url?: string;
}

interface CardProps {
  item: CardItem;
  variant?: "slide-show-card" | "blog-card" | "updates-card";
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
          {/* <Image
            src={item.image}
            // @QUESTION should role="presentation" be used instead of alt="" source: https://www.digitala11y.com/presentation-role/
            role="presentation"
            // @TODO discuss with Zach if there should be a empty alt attribute instead/alt information
            // alt={item.alt | ""}
          /> */}
          <Image
            id={item.image.id}
            alt={item.image.alt}
            uri={item.image.uri}
            useTransformation={true}
            transformations={item.image.transformations}
            transformationLabel={"2_1_960"}
            layout="responsive"
            width={900}
            height={450}
            quality={90}
          />
        </Link>
      </GridItem>
    </Grid>
  );
}

export default Card;
