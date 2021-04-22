// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

const onlineResourceSolrResolver = {
  Query: {
    allOnlineResourcesSolr: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllOnlineResourcesSolr(args);
      //return response.results;

      return {
        items: response.results,
        pageInfo: {
          totalItems: 25,
          // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
          timestamp: 3423434234
        }
      }
    },
  },
  OnlineResourceSolr: {
    id: onlineResource => {
      return onlineResource.uuid;
    },
    name: onlineResource => {
      return onlineResource.title;
    },
    description: onlineResource => {
      return onlineResource.summary;
    }
  }
}

export default onlineResourceSolrResolver;