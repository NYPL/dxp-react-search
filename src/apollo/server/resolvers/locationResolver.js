// DayJS
const dayjs = require('dayjs');
// DayJS timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
// Set default timezone.
dayjs.tz.setDefault('America/New_York');
// Utils
import sortByDistance from './../../../utils/sortByDistance';
import filterByOpenNow from './../../../utils/filterByOpenNow';
import hasActiveClosing from './../../../utils/hasActiveClosing';
import sortByName from './../../../utils/sortByName';
import setTodaysHours from './../../../utils/setTodaysHours';
import paginateResults from './../../../utils/paginateResults';
import filterByTerms from './../../../utils/filterByTerms';

// Create a dayjs date object, using default timezone.
// @see https://github.com/iamkun/dayjs/issues/1227
const now = dayjs.tz();
// Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
const today = now.format();

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

const locationResolver = {
  Query: {
    allLocations: async (parent, args, { dataSources }) => {
      const allLocations = await dataSources.refineryApi.getAllLocations();
      let results;
      let totalResultsCount = Object.keys(allLocations).length;

      // Add in hardcoded taxonomy data to each location.
      // @TODO See if greg can just add this to the refinery output for each location.
      // if not, move this to a utils function.
      /*
      allLocations.map(location => {
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
      */
      allLocations = addLocationTerms(allLocations);
      
      // Filter by openNow
      if (
        args.filter
        && 'openNow' in args.filter
        // openNow is set to true.
        && args.filter.openNow
      ) {
        console.log('openNow!');
        //console.log(args.filter.openNow);        
        // Check if we've prev modified the results.
        if (typeof results !== "undefined") {
          results = filterByOpenNow(now, results).sort(sortByName);
        } else {
          results = filterByOpenNow(now, allLocations).sort(sortByName); 
        }
        // We're removing locations from results, so set the new total results count.
        totalResultsCount = results.length;
      }
      
      // Filter by term ids.
      if (args.filter && 'termIds' in args.filter && args.filter.termIds.length) {
        console.log('termIds!');
        //console.log(args.filter.termIds);

        // Check if we've prev modified the results.
        if (typeof results !== "undefined") {
          results = filterByTerms(results, args.filter.termIds).sort(sortByName);
        } else {
          results = filterByTerms(allLocations, args.filter.termIds).sort(sortByName);
        }
        // We're removing locations from results, so set the new total results count.
        totalResultsCount = results.length;
      }

      // Sort by distance.
      // @TODO add proper check.
      // @FIX this always runs on the intial load of locations.
      if (
        args.sortByDistance 
        && args.sortByDistance.originLat 
        && args.sortByDistance.originLng
      ) {
        console.log('sortByDistance');
        if (typeof results !== "undefined") {
          results = sortByDistance(args.sortByDistance, results);
        } else {
          results = sortByDistance(args.sortByDistance, allLocations);
        }
      }

      // Default sort, alphabetical.
      if (!results) {
        console.log('default sort!');
        results = allLocations.sort(sortByName);
      }      
      return {
        locations: paginateResults(results, args),
        pageInfo: {
          totalItems: totalResultsCount
        }
      }
    },
  },
  Location: {
    id: location => location.slug.replace('/', '-'),
    name: location => location.name,
    status: location => location.slug,
    address_line1: location => location.street_address,
    address_line2: location => location.street_address,
    locality: location => location.locality,
    administrative_area: location => location.region,
    postal_code: location => location.postal_code,
    phone: location => location.contacts.phone,
    wheelchairAccess: location => {
      let wheelchairAccess;
	    switch (location.access) {
	      case 'Fully Accessible':
	        wheelchairAccess = 'full'
	        break;
	      case 'Partially Accessible':
	        wheelchairAccess = 'partial'
	        break;
	      case 'Not Accessible':
	        wheelchairAccess = 'none'
	        break;
	    }
      return wheelchairAccess;
    },
    accessibilityNote: location => location.accessibility_note,
    geoLocation: location => {
      return {
        lat: location.geolocation.coordinates[1],
        lng: location.geolocation.coordinates[0],
      };
    },
    todayHours: location => {
      return setTodaysHours(
        now, 
        location.hours.regular, 
        location._embedded.alerts,
        // Location has active closing relevant to today.
        hasActiveClosing(today, location._embedded.alerts, 'days'),
        // Extended closing check.
        hasActiveClosing(today, location._embedded.alerts, null) && !location.open
      );
    },
    open: location => {
      if (
        // Location has active closing.
        hasActiveClosing(today, location._embedded.alerts, null)
        // Extended closing field is marked false.
        && !location.open
      ) {
        return false;
      } else {
        return true;
      }
    },
    terms: location => {    
      let tids = [];
      // Set the tids from the refinery data.
      location.terms.map(vocab => vocab.terms)
        .map(vocab => vocab.map(term => {
          tids.push(term.uuid);
        }
      ));
      return tids;
    },
  },
}

export default locationResolver;