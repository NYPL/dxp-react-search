import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
import formatDate from "../../../utils/formatDate";
import { resolveImage } from "./utils/resolveImage";
import { getDrupalParagraphsField } from "./drupal-paragraphs/get-drupal-paragraphs-field";
import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";

export const blogDrupalParagraphsMap = {
  "paragraph--audio": "AudioEmbed",
  "paragraph--google_map": "GoogleMapEmbed",
  "paragraph--image": "ImageComponent",
  // For legacy reasons, we use a different type and component for Blog post's "link card list".
  "paragraph--link_card_list": "BlogCardGrid",
  "paragraph--social": "SocialEmbed",
  "paragraph--text": "Text",
  "paragraph--text_with_image": "TextWithImage",
  "paragraph--video": "Video",
};

export const blogResolver = {
  Query: {
    allBlogs: async (_, args, { dataSources }) => {
      const includedFields = [
        "field_ers_media_image.field_media_image",
        "field_main_content.field_ers_media_item.field_media_image",
        "field_erm_location",
      ];
      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };
      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        "blog",
        includedFields,
        args.filter,
        args.sort,
        pagination
      );
      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath
      );
      // @TODO Move this to a utils function.
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
    blog: async (_, args, { dataSources }) => {
      const includedFields = [
        "field_ers_media_image.field_media_image",
        "field_main_content.field_ers_media_item.field_media_image",
        "field_erm_location",
        // Link Card List
        "field_main_content.field_erm_link_cards",
        "field_main_content.field_erm_link_cards.field_ers_image.field_media_image",
      ];
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "blog",
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
  Blog: {
    id: (blog) => blog.id,
    title: (blog) => blog.title,
    description: (blog) => blog.field_tfls_summary_description.processed,
    slug: (blog) => blog.path.alias,
    byline: (blog) => {
      if (blog.field_ts_byline !== null) {
        return blog.field_ts_byline;
      } else if (
        blog.author.first_name !== null &&
        blog.author.last_name !== null
      ) {
        let byline = `${blog.author.first_name} ${blog.author.last_name}`;
        if (blog.author.job_title !== null) {
          byline = `${byline}, ${blog.author.job_title}`;
        }
        return byline;
      } else {
        return "NYPL Staff";
      }
    },
    date: (blog) => formatDate(blog.created),
    image: (blog) =>
      blog.field_ers_media_image.data !== null
        ? resolveImage(blog.field_ers_media_image)
        : null,
    locations: (blog) =>
      blog.field_erm_location.data?.length === 0
        ? null
        : blog.field_erm_location,
    mainContent: (blog) => getDrupalParagraphsField(blog.field_main_content),
  },
  BlogMainContent: {
    __resolveType: (object) => blogDrupalParagraphsMap[object.type] || null,
  },
  BlogLocation: {
    id: (location) => location.id,
    drupalInternalId: (location) => location.drupal_internal__nid,
    name: (location) => location.title,
    contentType: (location) => location.type,
    slug: (location) => location.path.alias,
  },
};
