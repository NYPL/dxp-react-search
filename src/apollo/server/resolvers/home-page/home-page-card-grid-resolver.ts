import {
  DrupalJsonApiLinkResource,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageCardGridParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
  field_erm_hp_cards: DrupalJsonApiHomePageCard[];
};

type DrupalJsonApiHomePageCard = {
  id: string;
  type: "paragraph--hp_card";
  field_ls_link: DrupalJsonApiLinkResource;
  field_tfls_description: DrupalJsonApiTextField;
  field_ts_heading: string;
  field_ers_image: DrupalJsonApiMediaImageResource;
};

export const HomePageCardGridResolver = {
  HomePageCardGridComponent: {
    id: (parent: DrupalJsonApiHomePageCardGridParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageCardGridParagraph) => parent.type,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageCardGridParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageCardGridParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageCardGridParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageCardGridParagraph) =>
      parent.field_ts_heading,
    gridVariant: (parent: DrupalJsonApiHomePageCardGridParagraph) =>
      parent.field_lts_hp_card_grid_variant,
    items: (parent: DrupalJsonApiHomePageCardGridParagraph) =>
      parent.field_erm_hp_cards.map((hpCardItem: DrupalJsonApiHomePageCard) => {
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
