import React from "react";

// Component
import ComponentWrapper from "../ComponentWrapper";
import { Grid } from "@chakra-ui/react";
import StaffPick from "./StaffPick";
// Type
import { StaffPicksItem } from "./StaffPicksTypes";

interface StaffPicksProps {
  title: string;
  link: string;
  items: StaffPicksItem[];
}

function StaffPicks({ title, link, items }: StaffPicksProps) {
  return (
    <ComponentWrapper
      title={title}
      link={link}
      textColor={"brand.100"}
      borderColor={"brand.100"}
      buttonBorder={"brand.100"}
      bg={"red.200"}
      paddingTop={true}
    >
      <Grid
        as="ul"
        maxWidth={{ base: "75vw", lg: "85vw" }}
        listStyleType="none"
        templateColumns={{
          base: " 1fr",
          md: "repeat(auto-fit, minmax(267px, 1fr))",
        }}
        gap={{ base: 7, lg: 8, xl: 10 }}
      >
        {items &&
          items.map((item: StaffPicksItem) => <StaffPick item={item} />)}
      </Grid>
    </ComponentWrapper>
  );
}

export default StaffPicks;