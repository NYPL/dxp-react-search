import {
  DrupalJsonApiLinkResource,
  DrupalJsonApiMediaImageResource,
} from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageSpotlightItemResource = {
  id: string;
  field_ts_heading: string;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkResource;
};

export const HomePageSpotlightItemResolver = {
  HomePageSpotlightItem: {
    id: (parent: DrupalJsonApiHomePageSpotlightItemResource) => parent.id,
    title: (parent: DrupalJsonApiHomePageSpotlightItemResource) =>
      parent.field_ts_heading,
    image: (parent: DrupalJsonApiHomePageSpotlightItemResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    url: (parent: DrupalJsonApiHomePageSpotlightItemResource) =>
      parent.field_lns_link?.url,
  },
};
