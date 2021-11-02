const graphqlFields = require("graphql-fields");

const onlineResourceResolver = {
  Query: {
    allOnlineResources: async (parent, args, { dataSources }, info) => {
      const response = await dataSources.drupalApi.getAllNodesByContentType(
        "online_resource",
        3,
        1,
        args.filter,
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
    onlineResource: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getOnlineResource(args);
      return response;
    },
  },
  OnlineResource: {
    id: (onlineResource) => onlineResource.id,
    name: (onlineResource) => onlineResource.title,
    description: (onlineResource) =>
      onlineResource.field_tfls_summary_description.processed,
    slug: (onlineResource) => onlineResource.path.alias,
  },
};

export default onlineResourceResolver;
