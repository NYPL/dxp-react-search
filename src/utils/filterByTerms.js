function filterByTerms(locations, terms) {  
  return locations.filter((location) => {    
    let locationTids = [];
    location.terms.map(vocab => vocab.terms)
      .map(vocab => vocab.map(term => {
        locationTids.push(term.id);
      }
    ));
    return terms.every(tid => locationTids.includes(tid));
  });  
}

export default filterByTerms;