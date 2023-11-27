import {
  DrupalJsonApiLinkField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageStaffPicksParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkField;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_heading: string;
  field_erm_hp_staffpicks: DrupalJsonApiStaffPicksItem[];
};

type DrupalJsonApiStaffPicksItem = {
  id: string;
  type: "paragraph--hp_staff_picks_item";
  field_ts_quote: string;
  field_ers_image: DrupalJsonApiMediaImageResource;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_staff_name: string;
  field_ts_staff_location: string;
};

export const HomePageStaffPicksResolver = {
  HomePageStaffPicksComponent: {
    id: (parent: DrupalJsonApiHomePageStaffPicksParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageStaffPicksParagraph) => parent.type,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageStaffPicksParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageStaffPicksParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageStaffPicksParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageStaffPicksParagraph) =>
      parent.field_ts_heading,
    items: (parent: DrupalJsonApiHomePageStaffPicksParagraph) =>
      Array.isArray(parent.field_erm_hp_staffpicks) &&
      parent.field_erm_hp_staffpicks,
  },
  HomePageStaffPicksItemComponent: {
    id: (parent: DrupalJsonApiStaffPicksItem) => parent.id,
    url: (parent: DrupalJsonApiStaffPicksItem) => parent.field_ls_link.url,
    quote: (parent: DrupalJsonApiStaffPicksItem) => parent.field_ts_quote,
    staffName: (parent: DrupalJsonApiStaffPicksItem) =>
      parent.field_ts_staff_name,
    staffLocation: (parent: DrupalJsonApiStaffPicksItem) =>
      parent.field_ts_staff_location,
    image: (parent: DrupalJsonApiStaffPicksItem) => {
      const image =
        parent.field_ers_image.data === null
          ? null
          : resolveImage(parent.field_ers_image);
      return image;
    },
  },
};
