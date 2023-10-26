type DrupalJsonApiHomePageSpotlightResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: { title: string; uri: string; url: string };
  field_ls_link: { title: string; uri: string; url: string };
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
};

export const HomePageSpotlightResolver = {
  HomePageSpotlightComponent: {
    id: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) =>
      parent.type,
    // status: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) => parent.status,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) =>
      parent.field_ts_heading,
    gridVariant: (parent: DrupalJsonApiHomePageSpotlightResolverParagraph) =>
      parent.field_lts_hp_card_grid_variant,
  },
};
