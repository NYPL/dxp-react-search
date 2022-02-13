import {
  getIndividualResourceJsonApiPath,
  getCollectionResourceJsonApiPath,
} from "./../datasources/drupal-json-api/getJsonApiPath";

const onlineResourceResolver = {
  Query: {
    allOnlineResources: async (_, args, { dataSources }) => {
      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };
      const apiPath = getCollectionResourceJsonApiPath(
        "node",
        "online_resource",
        null,
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
    onlineResource: async (_, args, { dataSources }) => {
      const isPreview = args.preview ? true : false;
      const apiPath = getIndividualResourceJsonApiPath(
        "node",
        "online_resource",
        null,
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
  OnlineResource: {
    id: (onlineResource) => onlineResource.id,
    name: (onlineResource) => onlineResource.title,
    description: (onlineResource) =>
      onlineResource.field_tfls_summary_description.processed,
    slug: (onlineResource) => onlineResource.path.alias,
  },
};

export default onlineResourceResolver;
