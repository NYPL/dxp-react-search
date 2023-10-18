import { resolveImage } from "../utils/resolveImage";
import {
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "./../drupal-types";
import { DrupalJsonApiButtonLinkParagraph } from "./button-links-resolver";

export type DrupalJsonApiLinkCardListParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ls_link: { url: string };
  field_erm_link_cards: DrupalJsonApiLinkCardParagraph[];
  field_lts_card_grid_layout: string;
};

export type DrupalJsonApiLinkCardParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ls_link: { url: string };
  field_ers_image: DrupalJsonApiMediaImageResource;
  field_erm_card_button_links?: DrupalJsonApiButtonLinkParagraph[];
};

export const CardGridResolver = {
  CardGrid: {
    id: (parent: DrupalJsonApiLinkCardListParagraph) => parent.id,
    type: () => "card_grid",
    title: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_ts_heading,
    description: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_tfls_description?.processed,
    layout: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_lts_card_grid_layout,
    items: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_erm_link_cards,
    // colorway: (parent: any) =>
  },
  CardGridItem: {
    id: (parent: DrupalJsonApiLinkCardParagraph) => parent.id,
    title: (parent: DrupalJsonApiLinkCardParagraph) => parent.field_ts_heading,
    description: (parent: DrupalJsonApiLinkCardParagraph) =>
      parent.field_tfls_description
        ? parent.field_tfls_description.processed
        : null,
    link: (parent: DrupalJsonApiLinkCardParagraph) => parent.field_ls_link?.url,
    image: (parent: DrupalJsonApiLinkCardParagraph) =>
      parent.field_ers_image.data === null
        ? null
        : resolveImage(parent.field_ers_image),
    buttonLinks: (parent: DrupalJsonApiLinkCardParagraph) => {
      if (Array.isArray(parent.field_erm_card_button_links)) {
        return parent.field_erm_card_button_links;
      }
      return null;
    },
  },
};
