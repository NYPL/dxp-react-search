import { DrupalJsonApiLinkResource } from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageStaffPicksResolverParagraph = {
  id: string;
  type: string;
  // status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
  field_erm_hp_staffpicks: any;
};

export const HomePageStaffPicksResolver = {
  HomePageStaffPicksComponent: {
    id: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) =>
      parent.type,
    // status: (
    //   parent: DrupalJsonApiHomePageStaffPicksResolverParagraph
    // ) => parent.status,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) =>
      parent.field_ts_heading,
    items: (parent: DrupalJsonApiHomePageStaffPicksResolverParagraph) =>
      parent.field_erm_hp_staffpicks.map((staffpicksItem: any) => {
        return {
          id: staffpicksItem.id,
          url: staffpicksItem.field_ls_link.url,
          quote: staffpicksItem.field_ts_quote,
          staffName: staffpicksItem.field_ts_staff_name,
          staffLocation: staffpicksItem.field_ts_staff_location,
          image:
            staffpicksItem.field_ers_image.data === null
              ? null
              : resolveImage(staffpicksItem.field_ers_image),
        };
      }),
  },
};
