/*function filterByTerms(locations, terms) {  
  return locations.filter((location) => {    
    let locationTids = [];
    location.terms.map(vocab => vocab.terms)
      .map(vocab => vocab.map(term => {
        locationTids.push(term.id);
      }
    ));
    console.log(locationTids);
    //return terms.every(tid => locationTids.includes(tid));
    return terms.some(tid => locationTids.includes(tid));
  });  
}
*/

function filterByTerms(locations, terms) {  
  return locations.filter((location) => {
    let locationTidsSome = [];
    let locationTidsEvery = [];
    //console.log(location.terms);
    /*location.terms.map(vocab => vocab.terms)
      .map(vocab => vocab.map(term => {
        if (
          vocab.id === 'filter-boroughs'
          || vocab.id === 'filter-accessibility'
        ) {
          locationTidsSome.push(term.id);
        } else {
          locationTidsEvery.push(term.id);
        }
      }
    ));
    */
    location.terms.map(vocab => {
      //console.log(vocab.terms);
      // Iterate over each vocabulary's terms
      vocab.terms.map(term => {
        if (
          vocab.id === 'filter-boroughs'
          //|| vocab.id === 'filter-accessibility'
        ) {
          //console.log(vocab.id);
          locationTidsSome.push(term.id);
        } else {
          locationTidsEvery.push(term.id);
        }
      })
    });

    console.log(locationTidsSome);


    if (
      terms.every(tid => locationTidsEvery.includes(tid))
      || terms.some(tid => locationTidsSome.includes(tid))
    ) {
      return true;
    }
  });  
}

export default filterByTerms;