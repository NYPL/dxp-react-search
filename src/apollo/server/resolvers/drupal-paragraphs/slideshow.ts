import {
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiSlideshowParagraph = {
  id: string;
  field_ts_heading: string;
  field_tfls_summary_descrip: DrupalJsonApiTextField;
  field_erm_media_items: DrupalJsonApiMediaImageResource[];
};

export const slideshowResolver = {
  Slideshow: {
    id: (parent: DrupalJsonApiSlideshowParagraph) => parent.id,
    type: () => "slideshow",
    heading: (parent: DrupalJsonApiSlideshowParagraph) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: DrupalJsonApiSlideshowParagraph) =>
      parent.field_tfls_summary_descrip?.processed,
    images: (parent: DrupalJsonApiSlideshowParagraph) =>
      parent.field_erm_media_items.map(
        (image: DrupalJsonApiMediaImageResource) => resolveImage(image)
      ),
  },
};
