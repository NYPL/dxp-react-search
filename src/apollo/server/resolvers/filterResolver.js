// Utils
import setNestedFilterItems from "./../../../utils/setNestedFilterItems";
import setNestedFilterItemsLegacy from "./../../../utils/setNestedFilterItemsLegacy";

const filterResolver = {
  Query: {
    allFiltersByGroupId: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllFiltersByGroupId(
        args.id,
        args.type,
        args.limiter
      );

      if (args.type === "content") {
        return response.data;
      }

      if (args.type === "taxonomy") {
        const terms = response.data;
        // Sort alpha.
        terms.sort((a, b) => a.name.localeCompare(b.name));
        return setNestedFilterItems(terms);
      }
    },
    // Legacy version.
    allFiltersByGroupIdLegacy: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllFiltersByGroupIdLegacy(
        args.id,
        args.limiter
      );
      const terms = response.data.terms;
      // Sort alpha.
      terms.sort((a, b) => a.name.localeCompare(b.name));
      // Set the item nesting.
      const nestedItems = setNestedFilterItemsLegacy(terms);
      return nestedItems;
    },
  },
  FilterItem: {
    id: (filterItem, args, context, info) => {
      if (info.variableValues.type === "taxonomy") {
        return String(filterItem.drupal_internal__tid);
      }
      if (info.variableValues.type === "content") {
        return String(filterItem.drupal_internal__nid);
      }
    },
    name: (filterItem, args, context, info) => {
      if (info.variableValues.type === "taxonomy") {
        return filterItem.name;
      }
      if (info.variableValues.type === "content") {
        return filterItem.title;
      }
    },
    drupalInternalId: (filterItem) => filterItem.drupal_internal__tid,
    children: (filterItem, args, context, info) => {
      if (info.variableValues.type === "taxonomy") {
        return filterItem.children;
      }
      if (info.variableValues.type === "content") {
        return null;
      }
    },
  },
  FilterItemLegacy: {
    id: (filterItem) => String(filterItem.tid),
    name: (filterItem) => filterItem.name,
    drupalInternalId: (filterItem) => filterItem.tid,
    children: (filterItem) => filterItem.children,
  },
};

export default filterResolver;
