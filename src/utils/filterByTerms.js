function filterByTerms(locations, filterGroups) {
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
        //console.log('OR!');

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
        } else {
          //orGroupStatus = true;
          //conditions.push(orGroupStatus);
        }
      } 
      if (filterGroup.operator === 'AND') {
        //console.log('AND!');

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
          console.log(filterGroup.id);
          // Add a false condition. there's a filter group with terms that returns no location.
          conditions.push(false);
        }
      }
      
      //conditions.push(orGroupStatus);
      //conditions.push(andGroupStatus);
      /*switch (filterGroup.operator) {
        case 'OR':
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
        case 'AND':
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
          }
          break;
      }
      */
    });

    //conditions.push(orGroupStatus);
    //conditions.push(andGroupStatus);

    console.log(conditions);
    
    // Check if all conditions return true.
    if (conditions.length && conditions.every(Boolean)) {
      accumulator.push(location);
    }

    return accumulator;
  }, []);
}

export default filterByTerms;