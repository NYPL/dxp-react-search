const graphqlFields = require("graphql-fields");
import { parseResolveInfo } from "graphql-parse-resolve-info";
// Utils
import formatDate from "../../../utils/formatDate";
import { drupalParagraphsResolver, imageResolver } from "./utils";
import {
  buildAllNodesByContentTypeJsonApiPath,
  buildNodeByIdJsonApiPath,
} from "../datasources/buildJsonApiPath";

const blogResolver = {
  Query: {
    allBlogs: async (parent, args, { dataSources }, info) => {
      const apiPath = buildAllNodesByContentTypeJsonApiPath(
        "blog",
        args.limit,
        args.pageNumber,
        args.filter,
        args.sortBy,
        graphqlFields(info)
      );

      const response = await dataSources.drupalApi.getAllNodesByContentType(
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
    blog: async (parent, args, { dataSources }) => {
      const apiPath = buildNodeByIdJsonApiPath("blog", args.id);
      const response = await dataSources.drupalApi.getNodeById(apiPath);
      return response;
    },
  },
  Blog: {
    id: (blog) => blog.id,
    title: (blog) => blog.title,
    description: (blog) =>
      blog.field_tfls_summary_description.processed.substring(0, 165),
    slug: (blog) => blog.path.alias,
    byline: (blog) => {
      if (blog.field_ts_byline !== null) {
        return blog.field_ts_byline;
      } else {
        let byline = `${blog.author.first_name} ${blog.author.last_name}`;
        if (blog.author.job_title !== null) {
          byline = `${byline}, ${blog.author.job_title}`;
        }
        return byline;
      }
    },
    date: (blog) => formatDate(blog.created),
    image: (blog) =>
      blog.field_ers_media_image.data !== null
        ? imageResolver(blog.field_ers_media_image.field_media_image)
        : null,
    locations: (blog) =>
      blog.field_erm_location !== null ? blog.field_erm_location : null,
    mainContent: (blog, args, context, info) => {
      const resolveInfo = parseResolveInfo(info);
      const typesInQuery = Object.keys(resolveInfo.fieldsByTypeName);
      return drupalParagraphsResolver(blog.field_main_content, typesInQuery);
    },
  },
  BlogMainContent: {
    __resolveType: (object, context, info) => {
      // @TODO could be a util function, where object is passed, along with an
      // array of allowed drupal paragraph types?
      let objectType;
      switch (object.type) {
        case "text_with_image":
          objectType = "TextWithImage";
          break;
        case "video":
          objectType = "Video";
          break;
        case "slideshow":
          objectType = "Slideshow";
          break;
      }
      return objectType;
    },
  },
  BlogLocation: {
    id: (location) => location.id,
    name: (location) => location.title,
    contentType: (location) => location.type,
    slug: (location) => "/slug/fix-me",
    url: (location) => "/slug/fix-me",
    status: (location) => "/slug/fix-me",
  },
};

export default blogResolver;
