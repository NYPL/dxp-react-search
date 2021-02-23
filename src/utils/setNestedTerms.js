/**
 * Converts an array of objects (terms) into a nested tree based on parent uuid.
 *
 * @param {array} terms - an array of objects.
 * @return {array} nestedTerms - an array of objects.
 */
function setNestedTerms(terms) {
  // Build an object of objects keyed by parent id.
  const parentsOnly = terms.reduce((accumulator, item) => {
    if (item.parent_uuid === 'virtual') {
      return {
        ...accumulator,
        [item.uuid]: {
          uuid: item.uuid,
          name: item.name,
          children: []
        }
      };
    }
    return accumulator;
  }, {});
  
  // Build the children keyed by parent id.
  const childrenOnly = terms.reduce((accumulator, term) => {
    const value = term['parent_uuid'];
    accumulator[value] = (accumulator[value] || []).concat(term);
    return accumulator;
  }, {});
  
  // Build the final nested filters structure.
  let nestedTerms = [];
  terms.map((term) => {
    if (term.parent_uuid === 'virtual') {
      nestedTerms.push({
        ...parentsOnly[term.uuid],
        children: childrenOnly[term.uuid] ? childrenOnly[term.uuid] : null
      });
    }
  });

  return nestedTerms;
}

export default setNestedTerms;