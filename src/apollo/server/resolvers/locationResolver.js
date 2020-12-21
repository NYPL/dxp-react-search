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

// Create a dayjs date object, using default timezone.
// @see https://github.com/iamkun/dayjs/issues/1227
const now = dayjs.tz();
// Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
const today = now.format();

const locationResolver = {
  Query: {
    allLocations: async (parent, args, { dataSources }) => {
      const allLocations = await dataSources.refineryApi.getAllLocations();
      
      let results;
      let totalResultsCount = Object.keys(allLocations).length;
      // Sort by distance only.
      if (args.sortByDistance && !args.filter) {
        console.log('sortByDistance only');
        results = sortByDistance(args.sortByDistance, allLocations);
      }
      // Filter only.
      if (args.filter) {
        // Open now only.
        if (args.filter.openNow) {
          console.log('filter: open now only');
          results = filterByOpenNow(now, allLocations).sort(sortByName);
          // We're removing locations from results, so set the new total results count.
          totalResultsCount = results.length;
        }
      }
      // Sort by distance and filter.
      if (args.sortByDistance && args.filter) {
        // Sort by distance && filter by open now.
        if (
          args.filter.openNow
          && args.sortByDistance.originLat
          && args.sortByDistance.originLng
        ) {
          console.log('both!');
          results = sortByDistance(args.sortByDistance, filterByOpenNow(now, allLocations));
          // We're removing locations from results, so set the new total results count.
          totalResultsCount = results.length;
        }
        // Sort by distance only.
        else if (
          args.sortByDistance.originLat
          && args.sortByDistance.originLng
        ) {
          console.log('filter is false, sort by distance only.');
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
    id: location => location.slug,
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
  },
}

export default locationResolver;