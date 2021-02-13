function addLocationTerms(allLocations) {
  return allLocations.map(location => {
    // Temp workaround for division & centers that has terms: null
    if (location.terms === null) {
      location.terms = [];
    }
    // Boroughs.
    switch (location.locality) {
      case 'New York':
        const boroughsManhattan = {
          id: 'filter-boroughs',
          name: 'Borough',
          terms: [
            {
              id: 'manhattan',
              name: 'New York'
            }
          ]
        };
        location.terms.push(boroughsManhattan);
        break;
      case 'Bronx':
        const boroughsBronx = {
          id: 'filter-boroughs',
          name: 'Borough',
          terms: [
            {
              id: 'bronx',
              name: 'Bronx',
            }
          ]
        };
        location.terms.push(boroughsBronx);
        break;
      case 'Staten Island':
        const boroughsStatenIsland = {
          id: 'filter-boroughs',
          name: 'Borough',
          terms: [
            {
              id: 'statenisland',
              name: 'Staten Island'
            }
          ]
        };
        location.terms.push(boroughsStatenIsland);
        break;
    }

    // Accessibility
    switch (location.access) {
      case 'Fully Accessible':
        const accessibilityFull = {
          id: 'filter-accessibility',
          name: 'Accessibility',
          terms: [
            {
              id: 'fullaccess',
              name: 'Fully accessible'
            },
          ]
        };
        location.terms.push(accessibilityFull);
        break;
      case 'Partially Accessible':
        const accessibilityPartial = {
          id: 'filter-accessibility',
          name: 'Accessibility',
          terms: [
            {
              id: 'partialaccess',
              name: 'Partially accessible'
            },
          ]
        };
        location.terms.push(accessibilityPartial);
        break;
      case 'Not Accessible':
        const accessibilityNone = {
          id: 'filter-accessibility',
          name: 'Accessibility',
          terms: [
            {
              id: 'noaccess',
              name: 'Not accessible'
            },
          ]
        };
        location.terms.push(accessibilityNone);
        break;
    }
  });
}

export default addLocationTerms;