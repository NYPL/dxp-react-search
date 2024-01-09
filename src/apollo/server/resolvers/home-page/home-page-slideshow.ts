import {
  DrupalJsonApiLinkField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageSlideshowParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkField;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_heading: string;
  field_erm_hp_slideshow_items: DrupalJsonApiSlideshowItem[];
};

type DrupalJsonApiSlideshowItem = {
  id: string;
  type: "paragraph--hp_slideshow_item";
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_audience: string;
  field_ts_author: string;
  field_ts_genre: string;
  field_ts_heading: string;
  field_ers_image: DrupalJsonApiMediaImageResource;
};

export const homePageSlideshowResolver = {
  HomePageSlideshowComponent: {
    id: (parent: DrupalJsonApiHomePageSlideshowParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageSlideshowParagraph) => parent.type,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageSlideshowParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageSlideshowParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageSlideshowParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageSlideshowParagraph) =>
      parent.field_ts_heading,
    items: (parent: DrupalJsonApiHomePageSlideshowParagraph) =>
      Array.isArray(parent.field_erm_hp_slideshow_items) &&
      parent.field_erm_hp_slideshow_items,
  },
  HomePageSlideshowItem: {
    id: (parent: DrupalJsonApiSlideshowItem) => parent.id,
    url: (parent: DrupalJsonApiSlideshowItem) => parent.field_ls_link.url,
    title: (parent: DrupalJsonApiSlideshowItem) => parent.field_ts_heading,
    audience: (parent: DrupalJsonApiSlideshowItem) => parent.field_ts_audience,
    genre: (parent: DrupalJsonApiSlideshowItem) => parent.field_ts_genre,
    author: (parent: DrupalJsonApiSlideshowItem) => parent.field_ts_author,
    image: (parent: DrupalJsonApiSlideshowItem) => {
      const image =
        parent.field_ers_image.data === null
          ? null
          : resolveImage(parent.field_ers_image);
      return image;
    },
  },
};
