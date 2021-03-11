//
export const BOROUGHS_UUID = 'filter-borough';
export const ACCESSIBILITY_UUID = 'filter-accessibility';
export const AMENITIES_UUID = 'fa817186-d735-4a05-8b72-388d3b6c7a14';
export const SUBJECTS_UUID = '9597730e-da47-4a4e-9f2d-5a4fc7b7fd41';
export const MEDIA_UUID = '4805f571-ec30-4901-912e-e88b41fb158e';

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