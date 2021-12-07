const graphqlFields = require("graphql-fields");
import {
  buildAllNodesByContentTypeJsonApiPath,
  buildNodeByIdJsonApiPath,
} from "../datasources/buildJsonApiPath";

const onlineResourceResolver = {
  Query: {
    allOnlineResources: async (parent, args, { dataSources }, info) => {
      const apiPath = buildAllNodesByContentTypeJsonApiPath(
        "online_resource",
        args.limit,
        args.pageNumber,
        args.filter,
        args.sortBy,
        graphqlFields(info)
      );

      const response = await dataSources.drupalApi.getAllNodesByContentType(
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
    onlineResource: async (parent, args, { dataSources }) => {
      const apiPath = buildNodeByIdJsonApiPath("online_resource", args.id);
      const response = await dataSources.drupalApi.getNodeById(apiPath);
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
