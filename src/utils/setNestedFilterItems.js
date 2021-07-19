/**
 * Converts an array of objects (terms) into a nested tree based on parent tid.
 *
 * @param {array} items - an array of objects.
 * @return {array} nestedTerms - an array of objects.
 */
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

export default setNestedFilterItems;