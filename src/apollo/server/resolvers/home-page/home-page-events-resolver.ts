import { DrupalJsonApiLinkField } from "../drupal-types";

type DrupalJsonApiHomePageEventsParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkField;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_heading: string;
};

export const HomePageEventsResolver = {
  HomePageEventsComponent: {
    id: (parent: DrupalJsonApiHomePageEventsParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageEventsParagraph) => parent.type,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageEventsParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageEventsParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageEventsParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageEventsParagraph) =>
      parent.field_ts_heading,
  },
};
