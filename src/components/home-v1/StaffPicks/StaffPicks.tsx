import React from "react";
// Component
import ComponentWrapper, { SeeMore } from "../ComponentWrapper";
import { Grid } from "@chakra-ui/react";
import StaffPick from "./StaffPick";
// Type
import { StaffPicksItem } from "./StaffPicksTypes";

interface StaffPicksProps {
  id?: string;
  title: string;
  link: string;
  items: StaffPicksItem[];
  seeMore?: SeeMore;
}

function StaffPicks({ id, title, link, items, seeMore }: StaffPicksProps) {
  return (
    <ComponentWrapper
      id={id}
      title={title}
      link={link}
      textColor={"brand.100"}
      borderColor={"brand.100"}
      buttonBorder={"brand.100"}
      bg={"red.200"}
      paddingTop={true}
      seeMore={seeMore}
    >
      <Grid
        as="ul"
        maxWidth={{ base: "100vw", lg: "85vw" }}
        listStyleType="none"
        templateColumns={{
          base: " 1fr",
          md: "repeat(auto-fit, minmax(267px, 1fr))",
        }}
        gap={{ base: 7, lg: 8, xl: 10 }}
      >
        {items &&
          items.map((item: StaffPicksItem, i) => (
            <StaffPick
              item={item}
              key={`staff-pick-item-key-${i}`}
              analyticsEventActions={{
                cta_subsection: title,
                cta_text: null,
                cta_position: `${i + 1}`,
              }}
              gaEventActionName={`${title} - ${i + 1}`}
            />
          ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default StaffPicks;
