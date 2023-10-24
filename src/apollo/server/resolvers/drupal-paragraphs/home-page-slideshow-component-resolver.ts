import { DrupalJsonApiLinkResource } from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageSlideshowComponentResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_erm_hp_slideshow_items: any;
};
export const HomePageSlideshowComponentResolver = {
  HomePageSlideshowComponent: {
    id: (parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph) =>
      parent.id,
    type: (parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph) =>
      parent.type,
    // status: (
    //   parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph
    // ) => parent.status,
    seeMore: {
      link: (
        parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph
      ) => parent.field_lns_see_all?.url || null,
      text: (
        parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph
      ) => parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (
      parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph
    ) => parent.field_ts_heading,
    items: (parent: DrupalJsonApiHomePageSlideshowComponentResolverParagraph) =>
      parent.field_erm_hp_slideshow_items.map((slideshowItem: any) => {
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
      }),
  },
};
