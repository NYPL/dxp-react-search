type HomePageSpotlightComponent = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: { title: string; uri: string; url: string };
  field_ls_link: { title: string; uri: string; url: string };
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
};

export const HomePageSpotlightComponentResolver = {
  HomePageSpotlightComponent: {
    id: (parent: HomePageSpotlightComponent) => parent.id,
    type: (parent: HomePageSpotlightComponent) => parent.type,
    // status: (parent: HomePageSpotlightComponent) => parent.status,
    seeMore: {
      link: (parent: HomePageSpotlightComponent) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: HomePageSpotlightComponent) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: HomePageSpotlightComponent) => parent.field_ls_link.url,
    heading: (parent: HomePageSpotlightComponent) => parent.field_ts_heading,
    gridVariant: (parent: HomePageSpotlightComponent) =>
      parent.field_lts_hp_card_grid_variant,
  },
};
