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
    filterGroups.forEach((filterGroup) => {
      let groupStatus = true;
      //switch (filterGroup.operator) {
        //case "OR":
          if (
            locationTerms[filterGroup.id] 
            && locationTerms[filterGroup.id].terms.length 
            && filterGroup 
            && filterGroup.terms.length
          ) {
            groupStatus = filterGroup.terms.some((tid) =>
              locationTerms[filterGroup.id].terms.includes(tid)
            );
            conditions.push(groupStatus);
          }
          //break;
      //}
    });

    //console.log(conditions);
    
    // Check if all conditions return true.
    if (conditions.every(Boolean)) {
      accumulator.push(location);
    }

    return accumulator;
  }, []);
}

export default filterByTerms;