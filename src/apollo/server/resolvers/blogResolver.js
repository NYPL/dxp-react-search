const graphqlFields = require("graphql-fields");
// Utils
import formatDate from "../../../utils/formatDate";

const blogResolver = {
  Query: {
    allBlogs: async (parent, args, { dataSources }, info) => {
      const response = await dataSources.drupalApi.getAllNodesByContentType(
        args.contentType,
        args.limit,
        args.pageNumber,
        args.filter,
        args.sortBy,
        graphqlFields(info)
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
    /*blog: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getOnlineResource(args);
      return response;
    },
    */
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
        ? blog.field_ers_media_image.field_media_image
        : null,
    locations: (blog) =>
      blog.field_erm_location !== null ? blog.field_erm_location : null,
  },
  Image: {
    id: (image) => image.id,
    alt: (image) => "test",
    uri: (image) => {
      if (image.uri.url && image.uri.url.includes("sites/default")) {
        return `http://localhost:8080${image.uri.url}`;
      } else {
        return image.uri.url;
      }
    },
    transformations: (image) => {
      console.log(image);
      let transformations = [];
      image.image_style_uri.forEach((imageStyle) => {
        for (const [label, uri] of Object.entries(imageStyle)) {
          transformations.push({
            id: `${image.id}__${label}`,
            label: label,
            uri: uri,
          });
        }
      });
      return transformations;
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
