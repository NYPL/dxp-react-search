// Utils
import setNestedFilterItems from './../../../utils/setNestedFilterItems';

const filterResolver = {
  Query: {
    allFiltersByGroupId: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllFiltersByGroupId(args);
      const terms = response.data.terms;
      // Sort alpha.
      terms.sort((a, b) => a.name.localeCompare(b.name));
      // Set the item nesting.
      const nestedItems = setNestedFilterItems(terms);
      return nestedItems;
    },
  },
  // @TODO move these to single line!
  FilterItem: {
    id: filterItem => String(filterItem.tid),
    name: filterItem => filterItem.name,
    drupalInternalId: filterItem => filterItem.tid,
    children: filterItem => filterItem.children,
  }
}

export default filterResolver;