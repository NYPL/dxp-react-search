const filterResolver = {
  Query: {
    allFiltersByGroupId: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllFiltersByGroupId(args);
      const terms = response.data.terms;
      // Sort alpha.
      terms.sort((a, b) => a.title.localeCompare(b.title))
      return terms;
    },
  },
  FilterItem: {
    id: filterItem => {
      //return filterItem.id;
      //return String(filterItem.attributes.drupal_internal__tid);
      //return filterItem.uuid;
      return String(filterItem.tid);
    },
    name: filterItem => {
      //return filterItem.attributes.name;
      return filterItem.title;
    },
    drupalInternalId: filterItem => {
      //return filterItem.attributes.drupal_internal__tid;
      return filterItem.tid;
    }
  }
}

export default filterResolver;