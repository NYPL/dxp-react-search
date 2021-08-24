const blogResolver = {
  Query: {
    allBlogs: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllNodesByContentType(
        args.contentType,
        args.limit,
        args.pageNumber
      );

      return {
        items: response.data,
        pageInfo: {
          totalItems: response.meta.count ? response.meta.count : 0,
          limit: args.limit ? args.limit : null,
          pageCount: Math.ceil(response.meta.count / args.limit),
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
    title: (blog) => blog.attributes.title,
    description: (blog) =>
      blog.attributes.field_tfls_summary_description.processed,
    //slug: (blog) => blog.attributes.path.alias,
    slug: (blog) => "/blog/fix-me",
  },
};

export default blogResolver;
