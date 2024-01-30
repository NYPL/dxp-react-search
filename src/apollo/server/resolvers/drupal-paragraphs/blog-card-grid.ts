import { resolveImage } from "../utils/resolveImage";
import {
  DrupalJsonApiLinkCardListParagraph,
  DrupalJsonApiLinkCardParagraph,
} from "./card-grid";

export const blogCardGridResolver = {
  BlogCardGrid: {
    id: (parent: DrupalJsonApiLinkCardListParagraph) => parent.id,
    type: () => "card_grid",
    title: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_ts_heading,
    description: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_tfls_description?.processed,
    items: (parent: DrupalJsonApiLinkCardListParagraph) =>
      parent.field_erm_link_cards,
  },
  BlogCardGridItem: {
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
  },
};
