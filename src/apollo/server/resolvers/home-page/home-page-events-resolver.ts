import { DrupalJsonApiLinkResource } from "../drupal-types";

type DrupalJsonApiHomePageEventsResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
};

export const HomePageEventsResolver = {
  HomePageEventsComponent: {
    id: (parent: DrupalJsonApiHomePageEventsResolverParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageEventsResolverParagraph) => parent.type,
    // status: (parent: DrupalJsonApiHomePageEventsResolverParagraph) =>
    //   parent.status,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageEventsResolverParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageEventsResolverParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageEventsResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageEventsResolverParagraph) =>
      parent.field_ts_heading,
  },
};
