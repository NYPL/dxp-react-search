import * as React from "react";
import { Box, Grid } from "@nypl/design-system-react-components";
import CardGridHeader from "./CardGridHeader";
import Card from "./Card";
import Image from "./../../shared/Image";
import TextFormatted from "../TextFormatted";
import { ImageType } from "../Image/ImageTypes";

export type CardGridLayoutTypes = "row" | "column" | "column_two_featured";

export interface CardGridCommonProps {
  id: string;
  type: string;
  title?: string;
  headingColor?: string;
  description?: string;
  link?: string;
  hrefText?: string;
  isBordered?: boolean;
  isCentered?: boolean;
}

type CardGridConditionalProps =
  | {
      items?: CardItem[];
      layout?: CardGridLayoutTypes;
      children?: never;
    }
  | {
      children?: React.ReactNode;
      items?: never;
      layout?: never;
    };

type CardGridProps = CardGridCommonProps & CardGridConditionalProps;

export interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: ImageType;
  link: string;
}

export default function CardGrid({
  id,
  type,
  title,
  headingColor,
  description,
  link,
  hrefText,
  layout = "column",
  isBordered = false,
  isCentered = false,
  items,
  children,
}: CardGridProps) {
  // Logic for template columns based on layout.
  let templateColumns = "repeat(12, 1fr)";
  // Logic for template row based on layout.
  let isBorderedFinal = isBordered;
  let isCenteredFinal = isCentered;
  if (layout === "row") {
    templateColumns = "repeat(1, 1fr)";
    isCenteredFinal = true;
  }

  // Helper function to get the grid column value based on layout and index.
  function getGridColumn(
    itemsCount: number,
    layout: CardGridLayoutTypes,
    index?: number
  ) {
    // Logic for grid column of each grid item.
    // Default for 3 cards across, 4 + 4 + 4 = 12.
    let gridColumn = "auto / span 4";
    // Default logic for items count and adjusting the grid-column value based on number of cards.
    // 5 cards.
    if (itemsCount === 5 && index !== undefined) {
      // 5 cards, 2 3
      gridColumn = index < 2 ? "auto / span 6" : "auto / span 4";
    }
    // 4 cards.
    if (itemsCount === 4) {
      // 4 cards, 4
      gridColumn = "auto / span 3";
    }
    // 2 cards.
    if (itemsCount === 2) {
      // 2 cards, 2
      gridColumn = "auto / span 6";
    }
    // Column: two featured.
    if (layout === "column_two_featured" && index !== undefined) {
      if (itemsCount === 6) {
        // 6 cards, 2 4
        gridColumn = index < 2 ? "auto / span 6" : "auto / span 3";
      }
      if (itemsCount === 4) {
        // 4 cards, 2 2
        gridColumn = "auto / span 6";
      }
    }

    return gridColumn;
  }

  return (
    <Box id={`${type}-${id}`} mb="xl">
      {title && (
        <CardGridHeader
          id={id}
          title={title}
          headingColor={headingColor}
          link={link}
          hrefText={hrefText}
        />
      )}
      {description && <TextFormatted html={description} />}
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns={{ lg: templateColumns }}
        gap="m"
      >
        {items &&
          items.map((item: CardItem, index) => {
            const { id, title, description, link, image } = item;
            return (
              <Box
                as="li"
                key={id}
                gridColumn={getGridColumn(items.length, layout, index)}
              >
                <Card
                  id={id}
                  heading={title}
                  description={description}
                  href={link}
                  layout={layout === "row" ? "row" : "column"}
                  isBordered={isBorderedFinal}
                  isCentered={isCenteredFinal}
                  {...(image && {
                    image: (
                      <Image
                        id={image.id}
                        alt={image.alt}
                        uri={image.uri}
                        useTransformation={true}
                        transformations={image.transformations}
                        transformationLabel={"2_1_960"}
                        layout="responsive"
                        width={900}
                        height={450}
                        quality={90}
                      />
                    ),
                  })}
                />
              </Box>
            );
          })}
      </Grid>
      {!items && children && <>{children}</>}
    </Box>
  );
}
