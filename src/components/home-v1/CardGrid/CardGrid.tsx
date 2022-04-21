import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Grid, GridItem } from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
import Card, { CardItem } from "./Card";

interface CardGridProps {
  title: string;
  link: string;
  items: CardItem[];
  hoverStyle?: boolean;
  variant?: "row-grid" | "column-grid" | "updates-grid";
  //props below go inform styling of LinkCard
  cardVariant?: "event-spotlight" | "event-card" | "blog-card" | "updates-card";
  size?: string | Record<string, string>;
}

function CardGrid({
  title,
  link,
  items,
  hoverStyle = false,
  variant,
  cardVariant,
  size,
}: CardGridProps) {
  const styles = useStyleConfig("CardGrid", { variant });
  return (
    <ComponentWrapper
      title={title}
      link={link}
      hoverStyle={hoverStyle}
      //last three could become passed through props
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
    >
      <Grid as="ul" sx={styles}>
        {items &&
          items.map((item) => (
            <GridItem as="li" listStyleType="none">
              <Card
                item={item}
                size={size || { base: "sm", md: "lg" }}
                variant={cardVariant}
              />
            </GridItem>
          ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default CardGrid;
