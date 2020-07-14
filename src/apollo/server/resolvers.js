export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return {
        id: 1,
        name: 'John Smith',
        status: 'cached'
      }
    },
    allLocations: async (parent, args, { dataSources }) => {
      const query = args.filter;
      const allLocations = await dataSources.drupalApi.getAllLocations(query);
      return allLocations;
    },
  },
}
