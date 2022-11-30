// Utils
import formatDate from "../../../utils/formatDate";
import resolveDrupalParagraphs from "./utils/resolveDrupalParagraphs";
import resolveParagraphTypes from "./utils/resolveParagraphTypes";
import { resolveImage } from "./utils/resolveImage";
import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";

const includedFields = [
  "field_ers_media_image.field_media_image",
  "field_main_content",
  "field_main_content.field_ers_media_item.field_media_image",
];

const pressReleaseResolver = {
  Query: {
    allPressReleases: async (_, args, { dataSources }) => {
      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };
      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        "press_release",
        includedFields,
        args.filter,
        args.sort,
        pagination
      );
      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath
      );
      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
          pageCount: response.meta
            ? Math.ceil(response.meta.count / args.limit)
            : 120,
          pageNumber: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
    pressRelease: async (_, args, { dataSources }) => {
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "press_release",
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
  },
  PressRelease: {
    id: (pressRelease) => pressRelease.id,
    title: (pressRelease) => pressRelease.title,
    subTitle: (pressRelease) => pressRelease.field_tfls_subtitle?.processed,
    description: (pressRelease) =>
      pressRelease.field_tfls_summary_description?.processed,
    slug: (pressRelease) => pressRelease.path.alias,
    date: (pressRelease) => formatDate(pressRelease.created),
    image: (pressRelease) =>
      pressRelease.field_ers_media_image.data !== null
        ? resolveImage(pressRelease.field_ers_media_image)
        : null,
    mediaContacts: (pressRelease) =>
      pressRelease.field_tfls_media_contacts?.processed,
    mainContent: (pressRelease, _, __, info) => {
      const typesInQuery = ["Text", "TextWithImage", "ImageComponent"];
      const mainContent =
        pressRelease.field_main_content.data?.length === 0
          ? null
          : resolveDrupalParagraphs(
              pressRelease.field_main_content,
              typesInQuery
            );
      return mainContent;
    },
  },
  PressReleaseMainContent: {
    __resolveType: (object, _, __) => {
      return resolveParagraphTypes(object.type);
    },
  },
};

export default pressReleaseResolver;
