import {
  DrupalJsonApiMediaImageResource,
  DrupalJsonApiLinkResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type HomePageEventJsonApiResource = {
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
    id: (parent: HomePageEventJsonApiResource) => parent.id,
    title: (parent: HomePageEventJsonApiResource) => parent.field_ts_heading,
    image: (parent: HomePageEventJsonApiResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    link: (parent: HomePageEventJsonApiResource) => parent.field_lns_link?.url,
    category: (parent: HomePageEventJsonApiResource) =>
      parent.field_lts_event_category,
    location: (parent: HomePageEventJsonApiResource) =>
      parent.field_ts_display_location,
    displayDate: (parent: HomePageEventJsonApiResource) => parent.field_ts_date,
    publishOn: (parent: HomePageEventJsonApiResource) => parent.publish_on,
    unpublishOn: (parent: HomePageEventJsonApiResource) => parent.unpublish_on,
    published: (parent: HomePageEventJsonApiResource) => parent.status,
    weight: (parent: HomePageEventJsonApiResource) => parent.field_is_weight,
  },
};
