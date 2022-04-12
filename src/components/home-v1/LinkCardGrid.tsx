import React from "react";
// Components
import { Grid, GridItem } from "@chakra-ui/react";
import ComponentWrapper from "./ComponentWrapper";
import LinkCard, { Variant, LinkCardItem } from "./LinkCard";

interface LinkCardGridProps {
  title: string;
  link: string;
  items: LinkCardItem[];
  layout?: string;
  gap?: string | Record<string, number>;
  hoverStyle?: boolean;
  variant?: Variant;
  size?: string | Record<string, string>;
  templateColumns?: string | Record<string, string>;
  templateRows?: string | Record<string, string>;
}

function LinkCardGrid({
  title,
  link,
  items,
  layout = "column",
  gap,
  hoverStyle = false,
  variant,
  size,
  templateColumns = undefined,
  templateRows = undefined,
}: LinkCardGridProps) {
  return (
    <ComponentWrapper
      title={title}
      link={link}
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
      hoverStyle={hoverStyle}
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
                templateColumns={templateColumns}
                templateRows={templateRows}
              />
            </GridItem>
          ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default LinkCardGrid;
