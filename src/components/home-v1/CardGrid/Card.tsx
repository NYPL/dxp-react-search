import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Heading, Text, Grid, GridItem, Box } from "@chakra-ui/react";
import Image, { ImageType } from "./../../shared/Image";
import HomePageLink, { AnalyticsEventActions } from "../HomePageLink";
export interface CardItem {
  id: string;
  title: string;
  description?: string;
  image: ImageType;
  url?: string;
}

interface CardProps {
  item: CardItem;
  variant?: "blog-card" | "updates-card";
  size?: any;
  analyticsEventActions: AnalyticsEventActions;
  gaEventActionName: string;
}

function Card({
  item,
  variant,
  size = "md",
  analyticsEventActions,
  gaEventActionName,
}: CardProps) {
  // Get Card theme styles
  const styles = useStyleConfig("Card", { variant, size });
  // Generate describedBy string (used by Blog Card)
  const describedByIdsArray = [];
  const omitItems = ["id", "title", "image", "url", "__typename"];
  for (const propName in item) {
    if (!omitItems.includes(propName)) {
      describedByIdsArray.push(`card-${propName}-${item.id}`);
    }
  }
  const describedByIdsString = describedByIdsArray.join(" ");

  return (
    <Grid
      id={`card-${item.id}`}
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
            href={item.url}
            analyticsEventActions={analyticsEventActions}
            gaEventActionName={gaEventActionName}
          >
            {item.title}
          </HomePageLink>
        </Heading>
        <Box className="details">
          {item.description && (
            <Text id={`card-description-${item.id}`}>{item.description}</Text>
          )}
        </Box>
      </GridItem>
      <GridItem id={`card-image-${item.id}`} colStart={1} rowStart={1}>
        <HomePageLink
          id={`card-image-link-${item.id}`}
          href={item.url}
          aria-label={`${item.title}-image`}
          analyticsEventActions={analyticsEventActions}
          gaEventActionName={gaEventActionName}
          tabIndex={-1}
        >
          {/* 
            // @QUESTION should role="presentation" be used instead of alt="" source: https://www.digitala11y.com/presentation-role/
            role="presentation"
          */}
          <Image
            id={`card-image-${item.image.id}`}
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
        </HomePageLink>
      </GridItem>
    </Grid>
  );
}

export default Card;
