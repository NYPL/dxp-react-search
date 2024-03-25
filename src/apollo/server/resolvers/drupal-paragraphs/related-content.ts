import {
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type RelatedContentParagraphJsonApi = {
  id: string;
  field_ts_heading: string;
  field_erm_related_items: RelatedContentItemParagraphJsonApi[];
};

type RelatedContentItemParagraphJsonApi = {
  id: string;
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ers_image: DrupalJsonApiMediaImageResource;
  field_ls_link: { url: string };
};

export const relatedContentResolver = {
  RelatedContent: {
    id: (parent: RelatedContentParagraphJsonApi) => parent.id,
    type: () => "related_content",
    title: (parent: RelatedContentParagraphJsonApi) => parent.field_ts_heading,
    items: (parent: RelatedContentParagraphJsonApi) =>
      parent.field_erm_related_items,
  },
  RelatedContentItem: {
    id: (parent: RelatedContentItemParagraphJsonApi) => parent.id,
    type: () => "related_content_item",
    title: (parent: RelatedContentItemParagraphJsonApi) =>
      parent.field_ts_heading,
    description: (parent: RelatedContentItemParagraphJsonApi) =>
      parent.field_tfls_description?.processed,
    link: (parent: RelatedContentItemParagraphJsonApi) =>
      parent.field_ls_link.url,
    image: (parent: RelatedContentItemParagraphJsonApi) =>
      parent.field_ers_image.data === null
        ? null
        : resolveImage(parent.field_ers_image),
  },
};
