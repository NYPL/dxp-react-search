import React from "react";
// Component
import { Grid, GridItem, Link } from "@chakra-ui/react";
import ComponentWrapper from "./ComponentWrapper";
import LinkCard, { Variant } from "./LinkCard";

interface UpdatesProps {
  title: string;
  link: string;
  items: UpdateItem[];
}

interface UpdateItem {
  title: string;
  description: string;
  image: string;
  url: string;
}
function Updates({ title, link, items }: UpdatesProps) {
  return (
    <ComponentWrapper
      title={title}
      link={link}
      hoverStyle={true}
      paddingTop={true}
      textColor="red.200"
      borderColor="red.200"
    >
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: 5, md: 3 }}
      >
        {items &&
          items.map((item) => {
            return (
              <GridItem as="li">
                <Link variant="link-hover-no-style">
                  <LinkCard item={item} variant={Variant.Updates} />
                </Link>
              </GridItem>
            );
          })}
      </Grid>
    </ComponentWrapper>
  );
}

export default Updates;
