import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;
import sortByDistance from './../../../utils/sortByDistance';
import filterByOpenNow from './../../../utils/filterByOpenNow';
import checkAlertsOpenStatus from './../../../utils/checkAlertsOpenStatus';
import sortByName from './../../../utils/sortByName';
// DayJS
const dayjs = require('dayjs');
// DayJS timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  // Tidy up the response from Refinery.
  locationNormalizer(location) {
    // Create a dayJS date object.
    const timeZone = 'America/New_York';
    let now = dayjs().tz(timeZone);

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

    // Today hours
    const weekDayKeys = new Array('Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.');

    let todayHoursStart;
    let todayHoursEnd;

    location.hours.regular.map(item => {
      if (weekDayKeys[now.day()] === item.day) {
        todayHoursStart = item.open;
        todayHoursEnd = item.close;
      }
    });

    // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
    const today = now.format();
    // Check open status based on alerts.
    const alertsOpenStatus = checkAlertsOpenStatus(today, location._embedded.alerts);

    // Open status
    let open = false;
    if (
      // Extended closing
      location.open
      // Alert closing
      && alertsOpenStatus
    ) {
      open = true;
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
      todayHours: {
        start: todayHoursStart,
        end: todayHoursEnd
      },
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
    const timeZone = 'America/New_York';
    let now = dayjs().tz(timeZone);

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
