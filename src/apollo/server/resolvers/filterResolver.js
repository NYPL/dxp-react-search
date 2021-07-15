const filterResolver = {
  Query: {
    allFiltersByGroupId: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllFiltersByGroupId(args);
      const terms = response.data.terms;
      // Sort alpha.
      terms.sort((a, b) => a.name.localeCompare(b.name));

      /*const nestedItems = setNestedFilterItems(terms);
      return nestedItems;
      */
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
      return filterItem.name;
    },
    drupalInternalId: filterItem => {
      //return filterItem.attributes.drupal_internal__tid;
      return filterItem.tid;
    },
    children: filterItem => {
      return filterItem.children;
    }
  }
}

function setNestedFilterItems(items) {
  // Build an object of objects keyed by parent id.
  const parentsOnly = items.reduce((accumulator, item) => {
    if (item.parent_tid === 'virtual') {
      return {
        ...accumulator,
        [item.tid]: {
          tid: item.tid,
          name: item.name,
          children: []
        }
      };
    }
    return accumulator;
  }, {});

  // Build the children keyed by parent id.
  const childrenOnly = items.reduce((accumulator, item) => {
    const value = item['parent_tid'];
    accumulator[value] = (accumulator[value] || []).concat(item);
    return accumulator;
  }, {});

  // Build the final nested filters structure.
  let nestedFilterItems = [];
  items.map((item) => {
    if (item.parent_tid === 'virtual') {
      nestedFilterItems.push({
        ...parentsOnly[item.tid],
        children: childrenOnly[item.tid] ? childrenOnly[item.tid] : null
      });
    }
  });

  return nestedFilterItems;
}

export default filterResolver;