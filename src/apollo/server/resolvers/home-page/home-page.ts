import {
  DrupalJsonApiEntityResource,
  DrupalJsonApiLinkField,
} from "./../drupal-types";
import {
  FilterItem,
  Sort,
} from "./../../datasources/drupal-json-api/getJsonApiPath";
import { DataSource } from "../../datasources/getDataSources";
import {
  getDrupalParagraphsField,
  DrupalJsonApiField,
} from "./../drupal-paragraphs/get-drupal-paragraphs-field";
import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "../../datasources/drupal-json-api/getJsonApiPath";

export const homePageDrupalParagraphsMap: { [name: string]: string } = {
  "paragraph--hp_spotlight": "HomePageSpotlightComponent",
  "paragraph--hp_events": "HomePageEventsComponent",
  "paragraph--hp_card_grid": "HomePageCardGridComponent",
  "paragraph--hp_slideshow": "HomePageSlideshowComponent",
  "paragraph--hp_staff_picks": "HomePageStaffPicksComponent",
};

const Sections = Object.keys(homePageDrupalParagraphsMap);

const SectionType = [...Sections] as const;

export interface HomePageSection extends DrupalJsonApiField {
  id: string;
  type: (typeof SectionType)[number];
  status: boolean;
  field_lns_see_all: DrupalJsonApiLinkField;
  field_ls_link: DrupalJsonApiLinkField;
  field_ts_heading: string;
}

export interface HomePageJsonApiResource {
  id: string;
  title: string;
  field_hp_section_2: HomePageSection;
  field_hp_section_3: HomePageSection;
  field_hp_section_4: HomePageSection;
  field_hp_section_5: HomePageSection;
  field_hp_section_6: HomePageSection;
  field_hp_section_7: HomePageSection;
  field_hp_section_8: HomePageSection;
}

interface QueryArgs {
  id: string;
  revisionId: string;
  limit: number;
  sort: Sort;
  preview: boolean;
  filter: FilterItem;
}

interface ContextValue {
  dataSources: DataSource;
  [key: string]: any;
}

export const homePageResolver = {
  Query: {
    homePage: async (
      _parent: HomePageJsonApiResource,
      args: QueryArgs,
      { dataSources }: ContextValue
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
      args: QueryArgs,
      { dataSources }: ContextValue
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
      const response: any =
        await dataSources.drupalJsonApi.getCollectionResource(
          apiPath,
          isPreview
        );
      // @TODO Move this to a utils function.
      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
        },
      };
    },
    homePageSpotlightCollection: async (
      _parent: any,
      args: QueryArgs,
      { dataSources }: ContextValue
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
      const response: any =
        await dataSources.drupalJsonApi.getCollectionResource(
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
      args: QueryArgs,
      { dataSources }: ContextValue
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
      const response: any =
        await dataSources.drupalJsonApi.getCollectionResource(
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
  SectionTwo: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
  SectionThree: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
  SectionFour: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
  SectionFive: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
  SectionSix: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
  SectionSeven: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
  SectionEight: {
    __resolveType: (object: DrupalJsonApiEntityResource) =>
      homePageDrupalParagraphsMap[object.type],
  },
};
