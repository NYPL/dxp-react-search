import {
  DrupalJsonApiMediaImageResource,
  DrupalJsonApiTextField,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type HeroParagraphJsonApiResource = {
  id: string;
  field_lts_hero_type: "primary" | "tertiary" | "campaign";
  field_ts_heading: string;
  field_tfls_description: DrupalJsonApiTextField;
  field_ers_background_image: DrupalJsonApiMediaImageResource;
  field_ers_image: DrupalJsonApiMediaImageResource;
};

export const heroResolver = {
  Hero: {
    id: (parent: HeroParagraphJsonApiResource) => parent.id,
    type: () => "hero",
    heroType: (parent: HeroParagraphJsonApiResource) =>
      parent.field_lts_hero_type,
    title: (parent: HeroParagraphJsonApiResource) =>
      parent.field_ts_heading ? parent.field_ts_heading : null,
    description: (parent: HeroParagraphJsonApiResource) =>
      parent.field_tfls_description?.processed,
    backgroundImage: (parent: HeroParagraphJsonApiResource) =>
      parent.field_ers_background_image.data === null
        ? null
        : resolveImage(parent.field_ers_background_image),
    foregroundImage: (parent: HeroParagraphJsonApiResource) =>
      parent.field_ers_image.data === null
        ? null
        : resolveImage(parent.field_ers_image),
  },
};
