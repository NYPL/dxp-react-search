import React from "react";

// Component
import ComponentWrapper from "../ComponentWrapper";
import { Grid } from "@chakra-ui/react";
import StaffPick from "./StaffPick";
// Type
import { StaffPicksItem } from "./StaffPicksTypes";

interface StaffPicksProps {
  title: string;
  items: StaffPicksItem[];
}

function StaffPicks({ title, items }: StaffPicksProps) {
  return (
    <ComponentWrapper
      title={title}
      textColor={"brand.100"}
      borderColor={"brand.100"}
      buttonBorder={"white"}
      bg={"red.200"}
      paddingTop={true}
    >
      <Grid
        as="ul"
        maxWidth={{ base: "75vw", lg: "82vw", xl: "85vw" }}
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
