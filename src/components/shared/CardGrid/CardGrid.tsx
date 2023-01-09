import * as React from "react";
import { Box, Grid } from "@nypl/design-system-react-components";
import { ImageType } from "../Image/ImageTypes";
import CardGridHeader from "./CardGridHeader";
import CardGridItem from "./CardGridItem";

export type CardGridLayoutTypes =
  | "row"
  | "column"
  | "column_one_featured"
  | "column_two_featured";

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
  // CardGrid can be used without passing an items array, and instead, a custom grid can be passed as children.
  if (!items && children) {
    return (
      <Box id={`${type}-${id}`} mb="2em">
        {title && (
          <CardGridHeader
            id={id}
            title={title}
            headingColor={headingColor}
            link={link}
            hrefText={hrefText}
          />
        )}
        {description && <p>{description}</p>}
        {children}
      </Box>
    );
  }

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
    // 2 cards.
    if (itemsCount && itemsCount === 2) {
      // 2 cards, 2
      gridColumn = "auto / span 6";
    }
    // 4 cards.
    if (itemsCount && itemsCount === 4) {
      // 4 cards, 4
      gridColumn = "auto / span 3";
    }

    // Column
    if (layout === "column" && index !== undefined) {
      // 5 cards, 2 3 layout
      if (itemsCount === 5) {
        gridColumn = index < 2 ? "auto / span 6" : "auto / span 4";
      }
    }

    // Column: two featured.
    if (layout === "column_two_featured" && index !== undefined) {
      if (itemsCount === 6) {
        // 6 cards, 2 4
        gridColumn = index < 2 ? "auto / span 6" : "auto / span 3";
      }
      if (itemsCount === 5) {
        // 5 cards, 2 3
        gridColumn = index < 2 ? "auto / span 6" : "auto / span 4";
      }
      if (itemsCount === 4) {
        // 4 cards, 2 2
        gridColumn = "auto / span 6";
      }
    }

    // Column: one featured.
    if (layout === "column_one_featured" && index !== undefined) {
      if (itemsCount === 4) {
        // 4 cards, 4
        gridColumn = "auto / span 3";
      }
      if (itemsCount === 3) {
        // 3 cards, 3
        gridColumn = "auto / span 4";
      }
      if (itemsCount === 2) {
        // 2 cards, 2
        gridColumn = "auto / span 6";
      }
    }

    return gridColumn;
  }

  if (items) {
    if (layout !== "column_one_featured") {
      return (
        <Box id={`${type}-${id}`} mb="2em">
          {title && (
            <CardGridHeader
              id={id}
              title={title}
              headingColor={headingColor}
              link={link}
              hrefText={hrefText}
            />
          )}
          {description && <p>{description}</p>}
          <Grid
            as="ul"
            listStyleType="none"
            templateColumns={{ lg: templateColumns }}
            gap="m"
          >
            {items.map((item: CardItem, index) => {
              return (
                <CardGridItem
                  item={item}
                  gridColumn={getGridColumn(items.length, layout, index)}
                  cardLayout={layout === "row" ? "row" : "column"}
                  isBordered={isBorderedFinal}
                  isCentered={isCenteredFinal}
                />
              );
            })}
          </Grid>
        </Box>
      );
    }
    // Column one featured requires 2 grids, the first is a row, second is a column.
    else if (layout === "column_one_featured") {
      const firstItem = items.slice(0, 1);
      const featuredCard = firstItem[0];
      const otherItems = items.slice(1, 6);

      return (
        <Box id={`${type}-${id}`} mb="2em">
          {title && (
            <CardGridHeader
              id={id}
              title={title}
              headingColor={headingColor}
              link={link}
              hrefText={hrefText}
            />
          )}
          {description && <p>{description}</p>}
          <Grid as="ul" listStyleType="none" gap="m">
            <CardGridItem
              item={featuredCard}
              cardLayout="row"
              isBordered={isBorderedFinal}
              isCentered={isCenteredFinal}
            />
          </Grid>
          {otherItems && (
            <Grid
              as="ul"
              listStyleType="none"
              templateColumns={{ lg: templateColumns }}
              gap="m"
            >
              {otherItems.map((item: CardItem, index) => {
                return (
                  <CardGridItem
                    item={item}
                    cardLayout="column"
                    gridColumn={getGridColumn(otherItems.length, layout, index)}
                    isBordered={isBorderedFinal}
                    isCentered={isCenteredFinal}
                  />
                );
              })}
            </Grid>
          )}
        </Box>
      );
    }
  }

  return null;
}
