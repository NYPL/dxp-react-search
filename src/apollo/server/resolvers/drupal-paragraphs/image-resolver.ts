import { DrupalJsonApiMediaImageResource } from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiImageParagraph = {
  id: string;
  field_ers_media_item: DrupalJsonApiMediaImageResource;
};

export function getImageLink(mediaResource: DrupalJsonApiMediaImageResource) {
  let imageLink = null;
  // Media DC image.
  if (
    mediaResource.type === "media--digital_collections_image" &&
    mediaResource.field_media_dc_link !== null
  ) {
    imageLink = mediaResource.field_media_dc_link?.url;
  }
  // Media image & remote catalog image.
  if (
    mediaResource.type === "media--image" ||
    mediaResource.type === "media--remote_catalog_image"
  ) {
    imageLink = mediaResource.field_media_image_link_url_only?.url;
  }
  return imageLink;
}

export const ImageResolver = {
  ImageComponent: {
    id: (parent: DrupalJsonApiImageParagraph) => parent.id,
    type: () => "image",
    link: (parent: DrupalJsonApiImageParagraph) =>
      getImageLink(parent.field_ers_media_item),
    caption: (parent: DrupalJsonApiImageParagraph) =>
      parent.field_ers_media_item.field_media_image_caption
        ? parent.field_ers_media_item.field_media_image_caption
        : null,
    credit: (parent: DrupalJsonApiImageParagraph) =>
      parent.field_ers_media_item.field_media_image_credit_html
        ? parent.field_ers_media_item.field_media_image_credit_html.processed
        : null,
    image: (parent: DrupalJsonApiImageParagraph) =>
      resolveImage(parent.field_ers_media_item),
  },
};
