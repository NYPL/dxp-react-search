import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Heading, Text, Link, Grid, GridItem, Box } from "@chakra-ui/react";
import Image from "./../../shared/Image";
import { ImageType } from "../../shared/Image/ImageTypes";

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
  let describedByIdsArray = [];
  const omitItems = ["id", "title", "image", "url", "__typename"];
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
          <Text id={`${item.id}-author`}>{item.author}</Text>
          <Text as="span" id={`${item.id}-audience`}>
            {item.audience}
          </Text>
          <Text as="span" id={`${item.id}-genre`}>
            {item.genre}
          </Text>
        </Box>
      </GridItem>
      <GridItem colStart={1} rowStart={1}>
        <Link href={item.url} aria-label={`${item.title}-image`} tabIndex={-1}>
          <Image
            id={item.image.id}
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
        </Link>
      </GridItem>
    </Grid>
  );
}

export default SlideshowCard;
