import {
  DrupalJsonApiLinkResource,
  DrupalJsonApiMediaImageResource,
} from "./../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type HomePageSpotlightItemJsonApiResource = {
  id: string;
  field_ts_heading: string;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkResource;
};

export const HomePageSpotlightItemResolver = {
  HomePageSpotlightItem: {
    id: (parent: HomePageSpotlightItemJsonApiResource) => parent.id,
    title: (parent: HomePageSpotlightItemJsonApiResource) =>
      parent.field_ts_heading,
    image: (parent: HomePageSpotlightItemJsonApiResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    url: (parent: HomePageSpotlightItemJsonApiResource) =>
      parent.field_lns_link?.url,
  },
};
