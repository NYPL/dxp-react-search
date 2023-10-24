import { DrupalJsonApiLinkResource } from "./../drupal-types";

type DrupalJsonApiHomePageEventsComponentResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
};

export const HomePageEventsComponentResolver = {
  HomePageEventsComponent: {
    id: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
      parent.id,
    type: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
      parent.type,
    // status: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
    //   parent.status,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageEventsComponentResolverParagraph) =>
      parent.field_ts_heading,
  },
};
