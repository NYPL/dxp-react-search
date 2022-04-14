import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Grid, GridItem } from "@chakra-ui/react";
import ComponentWrapper from "./ComponentWrapper";
import LinkCard, { Variant, LinkCardItem } from "./LinkCard";

interface LinkCardGridProps {
  title: string;
  link: string;
  items: LinkCardItem[];
  hoverStyle?: boolean;
  variant?: string;
  //props below go inform styling of LinkCard
  cardVariant?: Variant;
  size?: string | Record<string, string>;
}

function LinkCardGrid({
  title,
  link,
  items,
  hoverStyle = false,
  variant,
  cardVariant,
  size,
}: LinkCardGridProps) {
  const styles = useStyleConfig("LinkCardGrid", { variant });
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
              <LinkCard
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

export default LinkCardGrid;
