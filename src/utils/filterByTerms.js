/**
 * Takes an array of locations and reduces the array filtered by terms.
 *
 * @param {array} locations - an array of Location objects.
 * @param {array} filterGroups - an array of filter group objects.
 * @return {array} a reduced array of locations that are open now.
 */
function filterByTerms(locations, filterGroups) {
  return locations.reduce((accumulator, location) => {
    // Handle the terms attached to a location.
    let locationTerms = {};
    // Iterate over each vocab
    location.terms.forEach((vocab) => {
      let locationTerm = [];
      // Iterate over each vocabulary's terms
      vocab.terms.forEach((term) => {
        locationTerm.push(term.uuid);
      });
      // Build the locationTerms object.
      locationTerms[vocab.uuid] = {
        terms: locationTerm,
      };
    });

    // Handle the filters selected on the search form.
    let allGroupsStatuses = [];
    let orGroupStatus = false;
    let andGroupStatus = false;

    filterGroups.forEach((filterGroup) => {
      if (filterGroup.operator === "OR") {
        if (
          locationTerms[filterGroup.id] &&
          locationTerms[filterGroup.id].terms.length &&
          filterGroup &&
          filterGroup.terms.length
        ) {
          orGroupStatus = filterGroup.terms.some((tid) =>
            locationTerms[filterGroup.id].terms.includes(tid)
          );
          allGroupsStatuses.push(orGroupStatus);
        }
      }
      if (filterGroup.operator === "AND") {
        if (
          locationTerms[filterGroup.id] &&
          locationTerms[filterGroup.id].terms.length &&
          filterGroup &&
          filterGroup.terms.length
        ) {
          andGroupStatus = filterGroup.terms.every((tid) =>
            locationTerms[filterGroup.id].terms.includes(tid)
          );
          allGroupsStatuses.push(andGroupStatus);
        } else {
          // Add a false condition. there's a filter group with terms that returns no location.
          allGroupsStatuses.push(false);
        }
      }
    });

    // Check if all allGroupsStatuses return true.
    if (allGroupsStatuses.length && allGroupsStatuses.every(Boolean)) {
      accumulator.push(location);
    }

    return accumulator;
  }, []);
}

export default filterByTerms;
