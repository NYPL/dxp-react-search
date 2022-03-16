import React from "react";
import { Grid, Heading } from "@chakra-ui/react";
import ComponentWrapper from "./ComponentWrapper";

interface CardGridProps {
  title: string;
  items: CardGridItem[];
}

interface CardGridItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

function CardGrid({ title, items }: CardGridProps) {
  return (
    <ComponentWrapper title={title}>
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns="repeat(auto-fit, minmax(275px, 1fr))"
        gap={2}
      >
        {items.map((item: CardGridItem) => (
          <li key={item.id}>
            <img src={item.image} />
            <Heading
              as="h3"
              size="md"
              fontWeight="bold"
              fontFamily="Kievit-Medium"
              my={2}
            >
              {item.title}
            </Heading>
          </li>
        ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default CardGrid;
