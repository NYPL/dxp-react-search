// Utils
import setNestedFilterItems from "./../../../utils/setNestedFilterItems";
import { getCollectionResourceJsonApiPath } from "./../datasources/drupal-json-api/getJsonApiPath";
import { availabilityFilterMock } from "./../../../__content/onlineResources";

const filterResolver = {
  Query: {
    allFiltersByGroupId: async (_, args, { dataSources }) => {
      console.log(args);
      // Special handling for "availability" filters for online resources.
      if (args.mock && args.id === "availability") {
        return availabilityFilterMock.data;
      }

      const pagination = {
        limit: args.limit,
        pageNumber: args.pageNumber,
      };

      let entityType;
      let addFields = [];
      if (args.type === "taxonomy") {
        entityType = "taxonomy_term";
        addFields = ["name", "drupal_internal__tid", "vid", "uuid", "parent"];
      }
      if (args.type === "content") {
        entityType = "node";
        addFields = ["title", "drupal_internal__nid"];
      }
      const bundle = args.id;

      const apiPath = getCollectionResourceJsonApiPath(
        entityType,
        bundle,
        null,
        args.filter,
        args.sort,
        pagination,
        addFields
      );

      const response = await dataSources.drupalJsonApi.getCollectionResource(
        apiPath
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
};

export default filterResolver;
