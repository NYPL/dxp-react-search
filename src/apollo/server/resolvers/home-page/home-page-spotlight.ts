import {
  DrupalJsonApiLinkField,
  DrupalJsonApiMediaImageResource,
} from "../drupal-types";
import { resolveImage } from "../utils/resolveImage";

type DrupalJsonApiHomePageSpotlightParagraph = {
  id: string;
  type: string;
  field_lns_see_all: DrupalJsonApiLinkField;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_heading: string;
  field_lts_hp_card_grid_variant: "column-grid" | "row" | "updates";
};

type DrupalJsonApiHomePageSpotlightItemResource = {
  id: string;
  field_ts_heading: string;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkField;
};

export const homePageSpotlightResolver = {
  HomePageSpotlightComponent: {
    id: (parent: DrupalJsonApiHomePageSpotlightParagraph) => parent.id,
    type: (parent: DrupalJsonApiHomePageSpotlightParagraph) => parent.type,
    seeMore: {
      link: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
        parent.field_lns_see_all?.url || null,
      text: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
        parent.field_lns_see_all?.title || null,
    },
    link: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
      parent.field_ls_link.url,
    heading: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
      parent.field_ts_heading,
    gridVariant: (parent: DrupalJsonApiHomePageSpotlightParagraph) =>
      parent.field_lts_hp_card_grid_variant,
  },
  HomePageSpotlightItem: {
    id: (parent: DrupalJsonApiHomePageSpotlightItemResource) => parent.id,
    title: (parent: DrupalJsonApiHomePageSpotlightItemResource) =>
      parent.field_ts_heading,
    image: (parent: DrupalJsonApiHomePageSpotlightItemResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    url: (parent: DrupalJsonApiHomePageSpotlightItemResource) =>
      parent.field_lns_link?.url,
  },
};
