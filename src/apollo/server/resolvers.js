export const resolvers = {
  Query: {
    allLocations: async (parent, args, { dataSources }) => {
      const query = args.filter;
      const allLocations = await dataSources.drupalApi.getAllLocations(query);
      //const allLocations = await dataSources.refineryApi.getAllLocations();
      return allLocations;
    },
  },
}
