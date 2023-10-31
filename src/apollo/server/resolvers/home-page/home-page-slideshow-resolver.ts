import {
  DrupalJsonApiLinkResource,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageSlideshowParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_erm_hp_slideshow_items: DrupalJsonApiSlideshowItem[];
};

type DrupalJsonApiSlideshowItem = {
  id: string;
  type: "paragraph--hp_slideshow_item";
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_audience: string;
  field_ts_author: string;
  field_ts_genre: string;
  field_ts_heading: string;
  field_ers_image: DrupalJsonApiMediaImageResource;
};

export const HomePageSlideshowResolver = {
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
      parent.field_erm_hp_slideshow_items.map(
        (slideshowItem: DrupalJsonApiSlideshowItem) => {
          return {
            id: slideshowItem.id,
            url: slideshowItem.field_ls_link.url,
            title: slideshowItem.field_ts_heading,
            audience: slideshowItem.field_ts_audience,
            genre: slideshowItem.field_ts_genre,
            author: slideshowItem.field_ts_author,
            image:
              slideshowItem.field_ers_image.data === null
                ? null
                : resolveImage(slideshowItem.field_ers_image),
          };
        }
      ),
  },
};
