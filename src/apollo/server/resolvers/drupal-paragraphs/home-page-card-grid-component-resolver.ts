import { DrupalJsonApiLinkResource } from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageCardGridComponentResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_erm_hp_cards: any;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
};

export const HomePageCardGridComponentResolver = {
  HomePageCardGridComponent: {
    id: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
      parent.id,
    type: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
      parent.type,
    // status: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
    //   parent.status,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (
      parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph
    ) => parent.field_ts_heading,
    gridVariant: (
      parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph
    ) => parent.field_lts_hp_card_grid_variant,
    items: (parent: DrupalJsonApiHomePageCardGridComponentResolverParagraph) =>
      parent.field_erm_hp_cards.map((hpCardItem: any) => {
        return {
          id: hpCardItem.id,
          title: hpCardItem.field_ts_heading,
          url: hpCardItem.field_ls_link.url,
          image:
            hpCardItem.field_ers_image.data === null
              ? null
              : resolveImage(hpCardItem.field_ers_image),
          description:
            hpCardItem.field_tfls_description === null
              ? null
              : hpCardItem.field_tfls_description.processed,
        };
      }),
  },
};
