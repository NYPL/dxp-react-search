import {
  DrupalJsonApiMediaImageResource,
  DrupalJsonApiLinkResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageEventResource = {
  id: string;
  field_ts_heading: string;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkResource;
  field_lts_event_category: any;
  field_ts_display_location: string;
  field_ts_date: string;
  publish_on: string;
  unpublish_on: string;
  status: boolean;
  field_is_weight: number;
};

export const HomePageEventResolver = {
  HomePageEvent: {
    id: (parent: DrupalJsonApiHomePageEventResource) => parent.id,
    title: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.field_ts_heading,
    image: (parent: DrupalJsonApiHomePageEventResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    link: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.field_lns_link?.url,
    category: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.field_lts_event_category,
    location: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.field_ts_display_location,
    displayDate: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.field_ts_date,
    publishOn: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.publish_on,
    unpublishOn: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.unpublish_on,
    published: (parent: DrupalJsonApiHomePageEventResource) => parent.status,
    weight: (parent: DrupalJsonApiHomePageEventResource) =>
      parent.field_is_weight,
  },
};
