import { DrupalJsonApiLinkResource } from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageCardGridResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
  field_erm_hp_cards: any;
};

export const HomePageCardGridResolver = {
  HomePageCardGridComponent: {
    id: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
      parent.type,
    // status: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
    //   parent.status,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
      parent.field_ts_heading,
    gridVariant: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
      parent.field_lts_hp_card_grid_variant,
    items: (parent: DrupalJsonApiHomePageCardGridResolverParagraph) =>
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
