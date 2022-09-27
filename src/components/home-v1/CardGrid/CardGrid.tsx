import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Grid, GridItem } from "@chakra-ui/react";
import ComponentWrapper, { SeeMore } from "../ComponentWrapper";
import Card, { CardItem } from "./Card";

interface CardGridProps {
  id?: string;
  title: string;
  link: string;
  items: CardItem[];
  hoverStyle?: boolean;
  variant?: "row-grid" | "column-grid" | "updates-grid";
  // Props below inform styling of Card
  cardVariant?: "blog-card" | "updates-card";
  size?: string | Record<string, string>;
  seeMore?: SeeMore;
}

function CardGrid({
  id,
  title,
  link,
  items,
  hoverStyle = false,
  variant,
  cardVariant,
  size,
  seeMore,
}: CardGridProps) {
  const styles = useStyleConfig("CardGrid", { variant });
  return (
    <ComponentWrapper
      id={id}
      title={title}
      link={link}
      hoverStyle={hoverStyle}
      // @QUESTION Props below could become variant or passed through props
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
      seeMore={seeMore}
    >
      <Grid as="ul" sx={styles}>
        {items &&
          items.map((item, i) => (
            <GridItem
              as="li"
              key={`card-grid-item-key-${i}`}
              id={`card-grid-item-${item.id}`}
              listStyleType="none"
            >
              <Card
                item={item}
                size={size || { base: "sm", md: "lg" }}
                variant={cardVariant}
                gaEventActionName={`${title} - ${item.title} - ${i + 1}`}
              />
            </GridItem>
          ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default CardGrid;
