import React from "react";
// Components
import { Grid, GridItem } from "@chakra-ui/react";
import ComponentWrapper from "./ComponentWrapper";
import LinkCard, { Variant, LinkCardItem } from "./LinkCard";

interface LinkCardGridProps {
  title: string;
  link: string;
  items: LinkCardItem[];
  hoverStyle?: boolean;
  layout?: string;
  gap?: string | Record<string, number>;
  //props below go inform styling of LinkCard
  variant?: Variant;
  size?: string | Record<string, string>;
}

function LinkCardGrid({
  title,
  link,
  items,
  hoverStyle = false,
  layout = "column",
  gap,
  variant,
  size,
}: LinkCardGridProps) {
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
      <Grid
        as="ul"
        templateRows={
          layout === "column" ? { base: "1fr", md: "min-content" } : ""
        }
        templateColumns={
          layout === "column"
            ? {
                base: "1fr",
                md: "repeat(auto-fit, minmax(267px, 1fr))",
              }
            : ""
        }
        gap={gap || { base: 9, md: 6, xl: 7 }}
      >
        {items &&
          items.map((item) => (
            <GridItem as="li" listStyleType="none" w="100%">
              <LinkCard
                item={item}
                size={size || { base: "sm", md: "lg" }}
                variant={variant}
              />
            </GridItem>
          ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default LinkCardGrid;
