// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

const onlineResourceResolver = {
  Query: {
    allOnlineResources: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllOnlineResources(args);
      return response.data;
    },
    onlineResource: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getOnlineResource(args);
      return response;
    },
  },
  OnlineResource: {
    id: onlineResource => onlineResource.id,
    name: onlineResource => onlineResource.attributes.title,
    description: onlineResource => onlineResource.attributes.field_tfls_summary_description.processed,
    slug: onlineResource => onlineResource.attributes.path.alias
  }
}

export default onlineResourceResolver;