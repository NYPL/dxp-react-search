// Add in hardcoded taxonomy data to each location.
// @TODO See if greg can just add this to the refinery output for each location.
// @See https://jira.nypl.org/browse/RENO-1987
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
          uuid: 'filter-borough',
          name: 'Borough',
          terms: [
            {
              uuid: 'a9405ac3-6d14-4e2b-b8fa-bede59d231b5',
              name: 'New York'
            }
          ]
        };
        location.terms.push(boroughsManhattan);
        break;
      case 'Bronx':
        const boroughsBronx = {
          uuid: 'filter-borough',
          name: 'Borough',
          terms: [
            {
              uuid: '12060965-2125-4cf9-a724-b3560fdc3af6',
              name: 'Bronx',
            }
          ]
        };
        location.terms.push(boroughsBronx);
        break;
      case 'Staten Island':
        const boroughsStatenIsland = {
          uuid: 'filter-borough',
          name: 'Borough',
          terms: [
            {
              uuid: 'ecf1cc55-5591-45cc-adf1-6f72aa54f2ce',
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
          uuid: 'filter-accessibility',
          name: 'Accessibility',
          terms: [
            {
              uuid: '4f2f8b1b-dc71-4e66-9657-1c9fba52f3ff',
              name: 'Fully accessible'
            },
          ]
        };
        location.terms.push(accessibilityFull);
        break;
      case 'Partially Accessible':
        const accessibilityPartial = {
          uuid: 'filter-accessibility',
          name: 'Accessibility',
          terms: [
            {
              uuid: '907db826-860b-4a49-9a4f-e85bf842e193',
              name: 'Partially accessible'
            },
          ]
        };
        location.terms.push(accessibilityPartial);
        break;
      case 'Not Accessible':
        const accessibilityNone = {
          uuid: 'filter-accessibility',
          name: 'Accessibility',
          terms: [
            {
              uuid: '53c13a59-2aa2-4573-8af4-72fd8df5200a',
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