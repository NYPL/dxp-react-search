//
export const BOROUGHS_UUID = 'filter-boroughs';
export const ACCESSIBILITY_UUID = 'filter-accessibility';
export const AMENITIES_UUID = 'filter-amenities';
export const SUBJECTS_UUID = 'filter-subjects';
export const MEDIA_UUID = 'filter-media';

/**
 * Converts a redux state object to the gql format, and adds operator.
 *
 * @param {object} stateObject - an object of objects.
 * @return {array} termIds - an array of objects.
 */
function setTermsFilter(stateObject) {
  const termIds = [];
  // Add the operator
  let operator;
  for (let [key, value] of Object.entries(stateObject)) {
    switch (key) {
      case BOROUGHS_UUID:
      case ACCESSIBILITY_UUID:
        operator = 'OR';
        break;
      case AMENITIES_UUID:
      case SUBJECTS_UUID:
      case MEDIA_UUID:
        operator = 'AND';
        break;
    }
    // Build the filter object.
    const filter = {
      id: key,
      terms: value.terms,
      operator: operator
    };
    termIds.push(filter);
  }
  return termIds;
}

export default setTermsFilter;