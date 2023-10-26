import {
  DrupalJsonApiLinkResource,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
} from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type HomePageHeroJsonApiResource = {
  id: string;
  field_ts_heading: string;
  field_ts_hp_hero_tag: string;
  field_tfls_summary_description: DrupalJsonApiTextField;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkResource;
  publish_on: string;
  unpublish_on: string;
  status: boolean;
};

export const HomePageHeroResolver = {
  HomePageHero: {
    id: (parent: HomePageHeroJsonApiResource) => parent.id,
    heading: (parent: HomePageHeroJsonApiResource) => parent.field_ts_heading,
    tag: (parent: HomePageHeroJsonApiResource) => parent.field_ts_hp_hero_tag,
    description: (parent: HomePageHeroJsonApiResource) =>
      parent.field_tfls_summary_description === null
        ? null
        : parent.field_tfls_summary_description.processed,
    image: (parent: HomePageHeroJsonApiResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    link: (parent: HomePageHeroJsonApiResource) => parent.field_lns_link?.url,
    publishOn: (parent: HomePageHeroJsonApiResource) => parent.publish_on,
    unpublishOn: (parent: HomePageHeroJsonApiResource) => parent.unpublish_on,
    published: (parent: HomePageHeroJsonApiResource) => parent.status,
  },
};
