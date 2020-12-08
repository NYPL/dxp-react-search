import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;
// Utils
import sortByDistance from './../../../utils/sortByDistance';
import filterByOpenNow from './../../../utils/filterByOpenNow';
import hasActiveClosing from './../../../utils/hasActiveClosing';
import sortByName from './../../../utils/sortByName';
import setTodaysHours from './../../../utils/setTodaysHours';
// DayJS
const dayjs = require('dayjs');
// DayJS timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
// Set default timezone.
dayjs.tz.setDefault('America/New_York');

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  // Tidy up the response from Refinery.
  locationNormalizer(location) {
    // Create a dayjs date object, using default timezone.
    // @see https://github.com/iamkun/dayjs/issues/1227
    let now = dayjs.tz();

    let wheelchairAccess;
    switch(location.access) {
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

    // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
    const today = now.format();

    // Check if location has active closings within a date range.
    const locationHasActiveClosing = hasActiveClosing(today, location._embedded.alerts);

    // Set isExtendedClosing.
    let isExtendedClosing = false;
    if (locationHasActiveClosing && !location.open) {
      isExtendedClosing = true;
    }

    // Today hours
    const todayHours = setTodaysHours(now, location.hours.regular, location._embedded.alerts, locationHasActiveClosing, isExtendedClosing);
    // Open status
    let open = true;
    if (isExtendedClosing) {
      open = false;
    }

    return {
      id: location.slug,
      name: location.name,
      status: location.slug,
      address_line1: location.street_address,
      address_line2: location.street_address,
      locality: location.locality,
      administrative_area: location.region,
      postal_code: location.postal_code,
      phone: location.contacts.phone,
      wheelchairAccess: wheelchairAccess,
      accessibilityNote: location.accessibility_note,
      geoLocation: {
        lat: location.geolocation.coordinates[1],
        lng: location.geolocation.coordinates[0],
      },
      todayHours: todayHours,
      open: open,
    }
  }

  // Determine if we return all results or paginate.
  processResults(results, args) {
    // Check for limit and offset, if so, paginate results.
    if (args.limit) {
      console.log('offset: ' + args.offset);
      return results.slice(args.offset, args.limit + args.offset);
    } else {
      return results;
    }
  }

  async getAllLocations(args) {
    const response = await this.get('/locations/v1.0/locations');

    // Create a dayJS date object.
    // @see https://github.com/iamkun/dayjs/issues/1227
    let now = dayjs.tz();

    if (Array.isArray(response.locations)) {
      let results;
      let totalResultsCount = Object.keys(response.locations).length;

      // Sort by distance only.
      if (args.sortByDistance && !args.filter) {
        console.log('sortByDistance only');
        results = sortByDistance(args.sortByDistance, response.locations).map(location =>
          this.locationNormalizer(location)
        );
      }

      // Filter only.
      if (args.filter) {
        // Open now only.
        if (args.filter.openNow) {
          console.log('filter: open now only');
          results = filterByOpenNow(now, response.locations).sort(sortByName).map(location =>
            this.locationNormalizer(location)
          );
          // We're removing locations from results, so set the new total results count.
          totalResultsCount = results.length;
        }
      }

      if (args.sortByDistance && args.filter) {
        // Sort by distance && filter by open now.
        if (
          args.filter.openNow
          && args.sortByDistance.originLat
          && args.sortByDistance.originLng
        ) {
          console.log('both!');
          results = sortByDistance(args.sortByDistance, filterByOpenNow(now, response.locations)).map(location =>
            this.locationNormalizer(location)
          );
          // We're removing locations from results, so set the new total results count.
          totalResultsCount = results.length;
        }
        // Sort by distance only.
        else if (
          args.sortByDistance.originLat
          && args.sortByDistance.originLng
        ) {
          console.log('filter is false, sort by distance only.');
          results = sortByDistance(args.sortByDistance, response.locations).map(location =>
            this.locationNormalizer(location)
          );
        }
      }

      // Default sort, alphabetical.
      if (!results) {
        console.log('default sort!');
        results = response.locations.sort(sortByName).map(location =>
          this.locationNormalizer(location)
        );
      }

      return {
        locations: this.processResults(results, args),
        pageInfo: {
          totalItems: totalResultsCount
        }
      }
    } else {
      return [];
    }
  }
}

export default RefineryApi;
