/**
 * Converts an array of objects (terms) into a nested tree based on parent tid.
 *
 * @param {array} items - an array of objects.
 * @return {array} nestedTerms - an array of objects.
 */
function setNestedFilterItems(items) {
  // Build an object of objects keyed by parent id.
  const parentsOnly = items.reduce((accumulator, item) => {
    let parent_tid = "virtual";
    if (item.parent[0].meta.drupal_internal__target_id !== undefined) {
      parent_tid = item.parent[0].meta.drupal_internal__target_id;
    }
    if (parent_tid === "virtual") {
      return {
        ...accumulator,
        [item.drupal_internal__tid]: {
          id: item.id,
          drupal_internal__tid: item.drupal_internal__tid,
          name: item.name,
          children: [],
        },
      };
    }
    return accumulator;
  }, {});

  // Build the children keyed by parent id.
  const childrenOnly = items.reduce((accumulator, item) => {
    //const value = item['parent_tid'];
    //const value = item.parent[0].meta.drupal_internal__target_id;
    let parent_tid = "virtual";
    if (item.parent[0].meta.drupal_internal__target_id !== undefined) {
      parent_tid = item.parent[0].meta.drupal_internal__target_id;
    }
    accumulator[parent_tid] = (accumulator[parent_tid] || []).concat(item);
    return accumulator;
  }, {});

  // Build the final nested filters structure.
  let nestedFilterItems = [];
  items.map((item) => {
    let parent_tid = "virtual";
    if (item.parent[0].meta.drupal_internal__target_id !== undefined) {
      parent_tid = item.parent[0].meta.drupal_internal__target_id;
    }
    if (parent_tid === "virtual") {
      nestedFilterItems.push({
        ...parentsOnly[item.drupal_internal__tid],
        children: childrenOnly[item.drupal_internal__tid]
          ? childrenOnly[item.drupal_internal__tid]
          : null,
      });
    }
  });

  return nestedFilterItems;
}

export default setNestedFilterItems;
