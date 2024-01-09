import {
  DrupalJsonApiLinkField,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageCardGridParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkField;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
  field_erm_hp_cards: DrupalJsonApiHomePageCard[];
};

type DrupalJsonApiHomePageCard = {
  id: string;
  type: "paragraph--hp_card";
  field_ls_link: DrupalJsonApiLinkField;
  field_tfls_description: DrupalJsonApiTextField;
  field_ts_heading: string;
  field_ers_image: DrupalJsonApiMediaImageResource;
};

export const homePageCardGridResolver = {
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
      Array.isArray(parent.field_erm_hp_cards) && parent.field_erm_hp_cards,
  },
  HomePageCardComponent: {
    id: (parent: DrupalJsonApiHomePageCard) => parent.id,
    title: (parent: DrupalJsonApiHomePageCard) => parent.field_ts_heading,
    description: (parent: DrupalJsonApiHomePageCard) => {
      const description =
        parent.field_tfls_description === null
          ? null
          : parent.field_tfls_description.processed;
      return description;
    },
    url: (parent: DrupalJsonApiHomePageCard) => parent.field_ls_link.url,
    image: (parent: DrupalJsonApiHomePageCard) => {
      const image =
        parent.field_ers_image.data === null
          ? null
          : resolveImage(parent.field_ers_image);
      return image;
    },
  },
};
