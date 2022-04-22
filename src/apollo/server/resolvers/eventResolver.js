const eventResolver = {
  Query: {
    eventCollection: async (_, args, { dataSources }) => {
      const response = await dataSources.communicoApi.getCollectionResource(
        "events",
        args.limit,
        args.pageNumber,
        args.sort,
        args.filter
      );
      return {
        items: response.data.entries,
        pageInfo: {
          totalItems: response.data.total,
          limit: args.limit ? args.limit : null,
          pageCount: response.data.total
            ? Math.ceil(response.data.total / args.limit)
            : 100,
          pageNumber: args.pageNumber ? args.pageNumber : 1,
        },
      };
    },
    event: async (_, args, { dataSources }) => {
      const response = await dataSources.communicoApi.getIndividualResource(
        args.id
      );
      return response.data;
    },
  },
  Event: {
    id: (event) => event.eventId,
    title: (event) => event.title,
    shortDescription: (event) => event.shortDescription,
    description: (event) => event.description,
    startDate: (event) => event.eventStart,
    endDate: (event) => event.eventEnd,
    // @TODO this should really be event.featuredImage ?
    featuredImage: (event) => event.eventImage,
    locationName: (event) => event.locationName,
    audience: (event) => {
      const agesData = [];
      event.ages?.map((item) => {
        agesData.push({
          id: item.replace(/\s+/g, "-").toLowerCase(),
          name: item,
        });
      });
      return agesData;
    },
    eventTypes: (event) => {
      const eventTypesData = [];
      event.types?.map((item) => {
        eventTypesData.push({
          id: item.replace(/\s+/g, "-").toLowerCase(),
          name: item,
        });
      });
      return eventTypesData;
    },
  },
};

export default eventResolver;

// Query
// query($pageNumber: Int, $limit: Int, $sort: Sort) {
//   eventCollection(limit: $limit, pageNumber: $pageNumber, sort: $sort) {
//     items {
//       id
//       title
//       description
//     }
//     pageInfo {
//       limit
//       totalItems
//       pageCount
//     }
//   }
// }

// Query vars.
// {
//   "limit": 2,
//   "pageNumber": 2,
//   "sort": {
//     "field": "eventStart",
//     "direction": "descending"
//   }
// }

// Query individual
// query($id: String) {
//   event(id: $id) {
//     id
//     title
//     description
//   }
// }

// Query vars
// {
//   "id": "6478939"
// }
