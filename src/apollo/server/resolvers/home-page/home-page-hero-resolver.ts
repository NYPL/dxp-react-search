import {
  DrupalJsonApiLinkField,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageHeroResource = {
  id: string;
  field_ts_heading: string;
  field_ts_hp_hero_tag: string;
  field_tfls_summary_description: DrupalJsonApiTextField;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkField;
  publish_on: string;
  unpublish_on: string;
  status: boolean;
};

export const HomePageHeroResolver = {
  HomePageHero: {
    id: (parent: DrupalJsonApiHomePageHeroResource) => parent.id,
    heading: (parent: DrupalJsonApiHomePageHeroResource) =>
      parent.field_ts_heading,
    tag: (parent: DrupalJsonApiHomePageHeroResource) =>
      parent.field_ts_hp_hero_tag,
    description: (parent: DrupalJsonApiHomePageHeroResource) =>
      parent.field_tfls_summary_description === null
        ? null
        : parent.field_tfls_summary_description.processed,
    image: (parent: DrupalJsonApiHomePageHeroResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    link: (parent: DrupalJsonApiHomePageHeroResource) =>
      parent.field_lns_link?.url,
    publishOn: (parent: DrupalJsonApiHomePageHeroResource) => parent.publish_on,
    unpublishOn: (parent: DrupalJsonApiHomePageHeroResource) =>
      parent.unpublish_on,
    published: (parent: DrupalJsonApiHomePageHeroResource) => parent.status,
  },
};
