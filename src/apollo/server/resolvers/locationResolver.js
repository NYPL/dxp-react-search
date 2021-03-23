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
// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

const locationResolver = {
  Query: {
    allLocations: async (parent, args, { dataSources }) => {
      // Create a dayjs date object, using default timezone.
      // @see https://github.com/iamkun/dayjs/issues/1227
      const now = dayjs.tz();

      const allLocations = await dataSources.refineryApi.getAllLocations();
      
      let results;
      let totalResultsCount = Object.keys(allLocations).length;
      
      // Filter by openNow
      if (
        args.filter
        && 'openNow' in args.filter
        // openNow is set to true.
        && args.filter.openNow
      ) {
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
      if (args.filter 
        && 'termIds' in args.filter 
        && args.filter.termIds.length
      ) {
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
      if (
        args.sortByDistance
        && 'originLat' in args.sortByDistance
        && 'originLng' in args.sortByDistance
        && args.sortByDistance.originLat
        && args.sortByDistance.originLng
      ) {
        if (typeof results !== "undefined") {
          results = sortByDistance(args.sortByDistance, results);
        } else {
          results = sortByDistance(args.sortByDistance, allLocations);
        }
      }

      // Default sort, alphabetical.
      if (!results) {
        results = allLocations.sort(sortByName);
      }
      
      return {
        locations: paginateResults(results, args),
        pageInfo: {
          totalItems: totalResultsCount,
          // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
          timestamp: now.format()
        }
      }
    },
  },
  Location: {
    id: location => location.slug.replace('/', '-'),
    name: location => location.name,
    contentType: location => {
      let contentType;
      switch (location.type) {
        // Library
        case 'hub':
        case 'neighborhood':
        case 'research':
          contentType = 'library';
          break;
        // Center, Division
        case 'center':
        case 'division':
          contentType = location.type;
          break;
      }
      return contentType;
    },
    slug: location => location.slug,
    url: location => {
      let url;
      switch (location.type) {
        // Library
        case 'hub':
        case 'neighborhood':
        case 'research':
          url = `${NEXT_PUBLIC_NYPL_DOMAIN}/locations/${location.slug}`
          break;
        case 'center':
          // Pattern: /locations/<parent_slug>/<slug>
          url = `${NEXT_PUBLIC_NYPL_DOMAIN}/locations/${location.parent_library_slug}/${location.slug}`;
          break;
        case 'division':
          // Pattern: /locations/divisions/<slug>
          url = `${NEXT_PUBLIC_NYPL_DOMAIN}/locations/divisions/${location.slug}`;
          break;
      }
      return url;
    },
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
      // Create a dayjs date object, using default timezone.
      // @see https://github.com/iamkun/dayjs/issues/1227
      const now = dayjs.tz();
      // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
      const today = now.format();

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
    appointmentOnly: location => {
      if (location.by_appointment_only) {
        return true;
      } else {
        return false;
      }
    },
    open: location => {
      // Create a dayjs date object, using default timezone.
      // @see https://github.com/iamkun/dayjs/issues/1227
      // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
      const today = dayjs.tz().format();
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