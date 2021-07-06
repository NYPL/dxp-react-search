const filterResolver = {
  Query: {
    allFiltersByGroupId: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllFiltersByGroupId(args.id);
      return response.data;
    },
  },
  FilterItem: {
    id: filterItem => {
      //return filterItem.id;
      return String(filterItem.attributes.drupal_internal__tid);
    },
    name: filterItem => {
      return filterItem.attributes.name;
    },
    drupalInternalId: filterItem => {
      return filterItem.attributes.drupal_internal__tid;
    }
  }
}

export default filterResolver;