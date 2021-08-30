const graphqlFields = require("graphql-fields");

const blogResolver = {
  Query: {
    allBlogs: async (parent, args, { dataSources }, info) => {
      const response = await dataSources.drupalApi.getAllNodesByContentType(
        args.contentType,
        args.limit,
        args.pageNumber,
        null,
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
    /*id: (blog) => blog.id,
    title: (blog) => blog.attributes.title,
    description: (blog) =>
      blog.attributes.field_tfls_summary_description.processed,
    //slug: (blog) => blog.attributes.path.alias,
    slug: (blog) => "/blog/fix-me",
    */
    id: (blog) => blog.id,
    title: (blog) => blog.title,
    //description: (blog) => blog.field_tfls_summary_description.processed,
    description: (blog) =>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam est, ac varius integer pharetra nulla pellentesque. Nunc neque enim metus ut volutpat turpis nascetur.",
    slug: (blog) => blog.path.alias,
    image: (blog) =>
      blog.field_ers_media_image.data !== null
        ? blog.field_ers_media_image.field_media_image
        : null,
  },
  Image: {
    id: (image) => image.id,
    alt: (image) => "test",
    // @TODO Add code for including local host.
    //uri: (image) => image.uri.url,
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
};

export default blogResolver;
