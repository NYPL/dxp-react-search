import { DrupalJsonApiLinkResource } from "../drupal-types";

type DrupalJsonApiHomePageSpotlightParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
};

export const HomePageSpotlightResolver = {
  HomePageSpotlightComponent: {
    id: (parent: DrupalJsonApiHomePageSpotlightParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageSpotlightParagraph) => parent.type,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
      parent.field_ts_heading,
    gridVariant: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
      parent.field_lts_hp_card_grid_variant,
  },
};
