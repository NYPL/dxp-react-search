const eventFilterResolver = {
  Query: {
    eventFilterCollection: async (_, args, { dataSources }) => {
      const response = await dataSources.communicoApi.getCollectionResource(
        args.resourceType
      );
      // Ages resource returns only an array of strings, i.e., [ 'Adults', 'Teens/Young Adults', 'Children' ]
      // So we convert this to an orray of objects that matches the "types" resource response.
      if (args.resourceType === "ages") {
        const agesData = [];
        response.data.entries.map((item) => {
          agesData.push({
            id: item,
            name: item,
          });
        });
        return agesData;
      } else {
        return response.data.entries;
      }
    },
  },
  EventFilterItem: {
    id: (item) => item.name.replace(/\s+/g, "-").toLowerCase(),
    name: (item) => item.name,
  },
};

export default eventFilterResolver;

// query($resourceType: String) {
//   eventFilterCollection(resourceType: $resourceType) {
//     id
//     name
//   }
// }

// {
//   "resourceType": "types"
// }
