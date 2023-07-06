import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Heading, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import HomePageLink from "../HomePageLink";
import Image from "./../../shared/Image";
import { ImageType } from "../../shared/Image";

export interface SlideshowCardItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  audience: string;
  image: ImageType;
  url?: string;
}

interface SlideshowCardProps {
  item: SlideshowCardItem;
}

function SlideshowCard({ item }: SlideshowCardProps) {
  // Get Card theme styles
  const styles = useStyleConfig("Card", { variant: "slide-show-card" });
  // Generate describedBy string
  const describedByIdsArray = [];
  const omitItems = ["id", "title", "image", "url", "__typename"];
  for (const propName in item) {
    if (!omitItems.includes(propName)) {
      describedByIdsArray.push(`slideshow-card-${propName}-${item.id}`);
    }
  }
  const describedByIdsString = describedByIdsArray.join(" ");

  return (
    <Grid
      id={`slideshow-card-${item.id}`}
      data-testid={`slideshow-card-${item.id}`}
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
          <HomePageLink
            id={`slideshow-card-heading-link-${item.id}`}
            href={item.url}
          >
            {item.title}
          </HomePageLink>
        </Heading>
        <Box className="details">
          <Text id={`slideshow-card-author-${item.id}`}>{item.author}</Text>
          <Text as="span" id={`slideshow-card-audience-${item.id}`}>
            {item.audience}
          </Text>
          <Text as="span" id={`slideshow-card-genre-${item.id}`}>
            {item.genre}
          </Text>
        </Box>
      </GridItem>
      <GridItem colStart={1} rowStart={1}>
        <HomePageLink
          id={`slideshow-card-image-link-${item.id}`}
          href={item.url}
          aria-label={`${item.title}-image`}
          tabIndex={-1}
        >
          <Image
            id={`slideshow-${item.image.id}`}
            alt={item.image.alt}
            uri={item.image.uri}
            useTransformation={true}
            transformations={item.image.transformations}
            transformationLabel={"max_width_960"}
            layout="responsive"
            width={item.image.width}
            height={item.image.height}
            quality={90}
          />
        </HomePageLink>
      </GridItem>
    </Grid>
  );
}

export default SlideshowCard;
