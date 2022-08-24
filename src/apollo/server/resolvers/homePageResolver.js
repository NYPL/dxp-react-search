import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
// import formatDate from "../../../utils/formatDate";
import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
import resolveParagraphTypes from "./utils/resolveParagraphTypes";
import { resolveImage } from "./utils/resolveImage";
import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";

const homePageResolver = {
  Query: {
    homePage: async (_, args, { dataSources }) => {
      const includedFields = [
        // "field_hp_section_2.field_erm_hp_cards",
        // "field_hp_section_2.field_erm_hp_cards.field_ers_image.field_media_image",
        "field_hp_section_2",
        "field_hp_section_3",
        "field_hp_section_4.field_erm_hp_cards",
        "field_hp_section_4.field_erm_hp_cards.field_ers_image.field_media_image",
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
    homePageEventCollection: async (_, args, { dataSources }) => {
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
    homePageSpotlightCollection: async (_, args, { dataSources }) => {
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
    homePageHeroCollection: async (_, args, { dataSources }) => {
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
        null,
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
    id: (homePage) => homePage.id,
    title: (homePage) => homePage.title,
    sectionOne: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const sectionOne =
        homePage.field_hp_section_1.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [homePage.field_hp_section_1],
              typesInQuery
            );
      return sectionOne;
    },
    sectionTwo: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const sectionTwo =
        homePage.field_hp_section_2.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [homePage.field_hp_section_2],
              typesInQuery
            );
      return sectionTwo;
    },
    sectionThree: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const sectionThree =
        homePage.field_hp_section_3.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [homePage.field_hp_section_3],
              typesInQuery
            );
      return sectionThree;
    },
    sectionFour: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const sectionFour =
        homePage.field_hp_section_4.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [homePage.field_hp_section_4],
              typesInQuery
            );
      return sectionFour;
    },
    sectionSeven: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const sectionSeven =
        homePage.field_hp_section_7.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [homePage.field_hp_section_7],
              typesInQuery
            );
      return sectionSeven;
    },
    sectionEight: (homePage, _, __, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      const sectionEight =
        homePage.field_hp_section_8.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              [homePage.field_hp_section_8],
              typesInQuery
            );
      return sectionEight;
    },
  },
  SectionOne: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  SectionTwo: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  SectionThree: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  SectionFour: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  SectionSeven: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  SectionEight: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
  HomePageHero: {
    id: (homePageHero) => homePageHero.id,
    heading: (homePageHero) => homePageHero.field_ts_heading,
    tag: (homePageHero) => homePageHero.field_ts_hp_hero_tag,
    description: (homePageHero) =>
      homePageHero.field_tfls_summary_description.processed,
    image: (homePageHero) => {
      const image =
        homePageHero.field_ers_media_image.data === null
          ? null
          : resolveImage(homePageHero.field_ers_media_image);
      return image;
    },
    link: (homePageHero) => homePageHero.field_lns_link?.url,
    publishOn: (homePageEvent) => homePageEvent.publish_on,
    unpublishOn: (homePageEvent) => homePageEvent.unpublish_on,
    published: (homePageEvent) => homePageEvent.status,
  },
  HomePageSpotlightItem: {
    id: (homePageSpotlightItem) => homePageSpotlightItem.id,
    title: (homePageSpotlightItem) => homePageSpotlightItem.field_ts_heading,
    image: (homePageSpotlightItem) => {
      const image =
        homePageSpotlightItem.field_ers_media_image.data === null
          ? null
          : resolveImage(homePageSpotlightItem.field_ers_media_image);
      return image;
    },
    url: (homePageSpotlightItem) => homePageSpotlightItem.field_lns_link?.url,
  },
  HomePageEvent: {
    id: (homePageEvent) => homePageEvent.id,
    title: (homePageEvent) => homePageEvent.title,
    image: (homePageEvent) => {
      const image =
        homePageEvent.field_ers_media_image.data === null
          ? null
          : resolveImage(homePageEvent.field_ers_media_image);
      return image;
    },
    link: (homePageEvent) => homePageEvent.field_lns_link?.url,
    category: (homePageEvent) => homePageEvent.field_lts_event_category,
    location: (homePageEvent) => homePageEvent.field_ts_display_location,
    displayDate: (homePageEvent) => homePageEvent.field_ts_date,
    publishOn: (homePageEvent) => homePageEvent.publish_on,
    unpublishOn: (homePageEvent) => homePageEvent.unpublish_on,
    published: (homePageEvent) => homePageEvent.status,
    weight: (homePageEvent) => homePageEvent.field_is_weight,
  },
};

export default homePageResolver;
