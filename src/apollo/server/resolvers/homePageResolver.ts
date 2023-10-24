import {
  DrupalJsonApiEntityResource,
  DrupalJsonApiTextField,
  DrupalJsonApiMediaImageResource,
  DrupalJsonApiLinkResource,
} from "./drupal-types";

import { getDrupalParagraphsField } from "./drupal-paragraphs/get-drupal-paragraphs-field";
import { resolveImage } from "./utils/resolveImage";
import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "../datasources/drupal-json-api/getJsonApiPath";

export const homePageSectionDrupalParagraphsMap: { [name: string]: string } = {
  "paragraph--hp_spotlight": "HomePageSpotlightComponent",
  "paragraph--hp_events": "HomePageEventsComponent",
  "paragraph--hp_card_grid": "HomePageCardGridComponent",
  "paragraph--hp_slideshow": "HomePageSlideshowComponent",
  "paragraph--hp_staff_picks": "HomePageStaffPicksComponent",
};

export const homePageHeroDrupalNodeMap: { [name: string]: string } = {
  "node--home_page_hero": "HomePageHeroComponent",
  "node--home_page_spotlight_item": "HomePageSpotlightItem",
  "node--home_page_event": "HomePageEvent",
};
const Sections = Object.keys(homePageSectionDrupalParagraphsMap);

export interface HomePageSection {
  id: string;
  type: typeof Sections;
  status: boolean;
  field_lns_see_all: DrupalJsonApiLinkResource;
  field_ls_link: DrupalJsonApiLinkResource;
  field_ts_heading: string;
}

export interface HomePageJsonApiResource {
  id: string;
  title: string;
  // field_hp_section_1: HomePageSection;
  field_hp_section_2: HomePageSection;
  field_hp_section_3: HomePageSection;
  field_hp_section_4: HomePageSection;
  field_hp_section_5: HomePageSection;
  field_hp_section_6: HomePageSection;
  field_hp_section_7: HomePageSection;
  field_hp_section_8: HomePageSection;
}

type HomePageSpotlightItemJsonApiResource = {
  id: string;
  field_ts_heading: string;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkResource;
};

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

type HomePageHeroJsonApiResource = {
  id: string;
  field_ts_heading: string;
  field_ts_hp_hero_tag: string;
  field_tfls_summary_description: DrupalJsonApiTextField;
  field_ers_media_image: DrupalJsonApiMediaImageResource;
  field_lns_link: DrupalJsonApiLinkResource;
  publish_on: string;
  unpublish_on: string;
  status: boolean;
};

export const homePageResolver = {
  Query: {
    homePage: async (
      _parent: HomePageJsonApiResource,
      args: any,
      { dataSources }: any
    ) => {
      const includedFields = [
        // "field_hp_section_2.field_erm_hp_cards",
        // "field_hp_section_2.field_erm_hp_cards.field_ers_image.field_media_image",
        "field_hp_section_2",
        "field_hp_section_3",
        "field_hp_section_4.field_erm_hp_cards",
        "field_hp_section_4.field_erm_hp_cards.field_ers_image.field_media_image",
        "field_hp_section_5.field_erm_hp_staffpicks",
        "field_hp_section_5.field_erm_hp_staffpicks.field_ers_image.field_media_image",
        "field_hp_section_6.field_erm_hp_slideshow_items",
        "field_hp_section_6.field_erm_hp_slideshow_items.field_ers_image.field_media_image",
        "field_hp_section_7.field_erm_hp_cards",
        "field_hp_section_7.field_erm_hp_cards.field_ers_image.field_media_image",
        "field_hp_section_8.field_erm_hp_cards",
        "field_hp_section_8.field_erm_hp_cards.field_ers_image.field_media_image",
      ];
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "home_page",
        includedFields,
        args.id,
        args.revisionId
      );
      const response = await dataSources.drupalJsonApi.getIndividualResource(
        apiPath,
        isPreview
      );
      return response;
    },
    homePageEventCollection: async (
      _parent: any,
      args: any,
      { dataSources }: any
    ) => {
      const includedFields = ["field_ers_media_image.field_media_image"];
      const pagination = {
        limit: args.limit,
        pageNumber: 1,
      };
      const isPreview = args.preview ? true : false;

      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        "home_page_event",
        includedFields,
        args.filter,
        args.sort,
        pagination
      );
      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath,
        isPreview
      );
      // @TODO Move this to a utils function.
      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
          // pageCount: response.meta
          //   ? Math.ceil(response.meta.count / args.limit)
          //   : 120,
          // pageNumber: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
    homePageSpotlightCollection: async (
      _parent: any,
      args: any,
      { dataSources }: any
    ) => {
      const includedFields = ["field_ers_media_image.field_media_image"];
      const pagination = {
        limit: args.limit,
        pageNumber: 1,
      };
      const isPreview = args.preview ? true : false;

      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        "home_page_spotlight_item",
        includedFields,
        args.filter,
        args.sort,
        pagination
      );
      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath,
        isPreview
      );
      // @TODO Move this to a utils function.
      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
          // pageCount: response.meta
          //   ? Math.ceil(response.meta.count / args.limit)
          //   : 120,
          // pageNumber: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
    homePageHeroCollection: async (
      _parent: any,
      args: any,
      { dataSources }: any
    ) => {
      const includedFields = ["field_ers_media_image.field_media_image"];
      const pagination = {
        limit: 10,
        pageNumber: 1,
      };
      const isPreview = args.preview ? true : false;

      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        "home_page_hero",
        includedFields,
        args.filter,
        undefined,
        pagination
      );
      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath,
        isPreview
      );
      // @TODO Move this to a utils function.
      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
          // pageCount: response.meta
          //   ? Math.ceil(response.meta.count / args.limit)
          //   : 120,
          // pageNumber: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
  },
  HomePage: {
    id: (parent: HomePageJsonApiResource) => parent.id,
    title: (parent: HomePageJsonApiResource) => parent.title,
    // sectionOne: (parent: HomePageJsonApiResource) =>
    //   getDrupalParagraphsField(parent.field_hp_section_1),
    sectionTwo: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_2),
    sectionThree: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_3),
    sectionFour: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_4),
    sectionFive: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_5),
    sectionSix: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_6),
    sectionSeven: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_7),
    sectionEight: (parent: HomePageJsonApiResource) =>
      getDrupalParagraphsField(parent.field_hp_section_8),
  },
  // SectionOne: {
  //   __resolveType: (object: DrupalJsonApiEntityResource) =>
  //     homePageSectionDrupalParagraphsMap[object.type],
  // },
  SectionTwo: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  SectionThree: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  SectionFour: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  SectionFive: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  SectionSix: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  SectionSeven: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  SectionEight: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageSectionDrupalParagraphsMap[object.type],
  },
  HomePageHero: {
    id: (parent: HomePageHeroJsonApiResource) => parent.id,
    heading: (parent: HomePageHeroJsonApiResource) => parent.field_ts_heading,
    tag: (parent: HomePageHeroJsonApiResource) => parent.field_ts_hp_hero_tag,
    description: (parent: HomePageHeroJsonApiResource) =>
      parent.field_tfls_summary_description === null
        ? null
        : parent.field_tfls_summary_description.processed,
    image: (parent: HomePageHeroJsonApiResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    link: (parent: HomePageHeroJsonApiResource) => parent.field_lns_link?.url,
    publishOn: (parent: HomePageHeroJsonApiResource) => parent.publish_on,
    unpublishOn: (parent: HomePageHeroJsonApiResource) => parent.unpublish_on,
    published: (parent: HomePageHeroJsonApiResource) => parent.status,
  },
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
  HomePageSpotlightItem: {
    id: (parent: HomePageSpotlightItemJsonApiResource) => parent.id,
    title: (parent: HomePageSpotlightItemJsonApiResource) =>
      parent.field_ts_heading,
    image: (parent: HomePageSpotlightItemJsonApiResource) => {
      const image =
        parent.field_ers_media_image.data === null
          ? null
          : resolveImage(parent.field_ers_media_image);
      return image;
    },
    url: (parent: HomePageSpotlightItemJsonApiResource) =>
      parent.field_lns_link?.url,
  },
};

export default homePageResolver;
