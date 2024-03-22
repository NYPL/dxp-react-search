import { resolveImage } from "../utils/resolveImage";
import {
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { getImageLink } from "./image";

type DrupalJsonApiTextWithImageParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_summary_descrip: DrupalJsonApiTextField;
  field_ers_media_item: DrupalJsonApiMediaImageResource;
  field_lts_image_alignment: "left" | "right";
};

export const textWithImageResolver = {
  TextWithImage: {
    id: (parent: DrupalJsonApiTextWithImageParagraph) => parent.id,
    type: () => "text_with_image",
    heading: (parent: DrupalJsonApiTextWithImageParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    text: (parent: DrupalJsonApiTextWithImageParagraph) =>
      parent.field_tfls_summary_descrip?.processed,
    caption: (parent: DrupalJsonApiTextWithImageParagraph) =>
      parent.field_ers_media_item.field_media_image_caption
        ? parent.field_ers_media_item.field_media_image_caption
        : null,
    credit: (parent: DrupalJsonApiTextWithImageParagraph) =>
      parent.field_ers_media_item.field_media_image_credit_html
        ? parent.field_ers_media_item.field_media_image_credit_html.processed
        : null,
    link: (parent: DrupalJsonApiTextWithImageParagraph) =>
      getImageLink(parent.field_ers_media_item),
    image: (parent: DrupalJsonApiTextWithImageParagraph) =>
      parent.field_ers_media_item.data === null
        ? null
        : resolveImage(parent.field_ers_media_item),
    imageAlignment: (parent: DrupalJsonApiTextWithImageParagraph) =>
      parent.field_lts_image_alignment === null
        ? "left"
        : parent.field_lts_image_alignment,
  },
};