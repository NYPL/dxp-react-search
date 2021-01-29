/**
 * Takes an array of locations and reduces the array filtered by terms.
 *
 * @param {array} locations - an array of Location objects.
 * @param {array} filterGroups - an array of filter group objects.
 * @return {array} a reduced array of locations that are open now.
 */
function filterByTerms(locations, filterGroups) {
  console.log(filterGroups);
  return locations.reduce((accumulator, location) => {
    // 
    let locationTerms = {};
    // Iterate over each vocab
    location.terms.forEach((vocab) => {
      let locationTerm = [];
      // Iterate over each vocabulary's terms
      vocab.terms.forEach((term) => {
        locationTerm.push(term.id);
      });
      // Build the locationTerms object.
      locationTerms[vocab.id] = {
        terms: locationTerm
      };
    });

    //
    let conditions = [];
    let orGroupStatus = false;
    let andGroupStatus = false;
    filterGroups.forEach((filterGroup) => {
      if (filterGroup.operator === 'OR') {
        if (
          locationTerms[filterGroup.id] 
          && locationTerms[filterGroup.id].terms.length 
          && filterGroup 
          && filterGroup.terms.length
        ) {
          orGroupStatus = filterGroup.terms.some((tid) =>
            locationTerms[filterGroup.id].terms.includes(tid)
          );
          conditions.push(orGroupStatus);
        } 
      } 
      if (filterGroup.operator === 'AND') {
        if (
          locationTerms[filterGroup.id] 
          && locationTerms[filterGroup.id].terms.length 
          && filterGroup 
          && filterGroup.terms.length
        ) {
          andGroupStatus = filterGroup.terms.every((tid) =>
            locationTerms[filterGroup.id].terms.includes(tid)
          );
          conditions.push(andGroupStatus);
        } else {
          //console.log(filterGroup.id);
          // @TODO not sure if we need this or if it should be done differently,
          // will have to test more after we have real data.
          // Add a false condition. there's a filter group with terms that returns no location.
          conditions.push(false);
        }
      }
    });
    //console.log(conditions);
    
    // Check if all conditions return true.
    if (conditions.length && conditions.every(Boolean)) {
      accumulator.push(location);
    }

    return accumulator;
  }, []);
}

export default filterByTerms;