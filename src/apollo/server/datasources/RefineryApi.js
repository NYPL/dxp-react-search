import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;
import sortByDistance from './../../../utils/sortByDistance';
import filterByOpenNow from './../../../utils/filterByOpenNow';
import sortByName from './../../../utils/sortByName';

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  // Tidy up the response from Refinery.
  locationNormalizer(location) {
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
    const currentDate = new Date();
    const weekDayKeys = new Array('Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.');

    let todayHoursStart;
    let todayHoursEnd;

    location.hours.regular.map(item => {
      if (weekDayKeys[currentDate.getDay()] === item.day) {
        todayHoursStart = item.open;
        todayHoursEnd = item.close;
      }
    });

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
      open: location.open,
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
    /*
    let response;
    console.table(args);
    // Pagination
    if (args.limit) {
      response = await this.get(`/locations/v1.0/locations?page[size]=${args.limit}&page[number]=${args.pageNumber}`);
    } else {
      response = await this.get('/locations/v1.0/locations?page[size]=300');
    }
    */

    const response = await this.get('/locations/v1.0/locations?page[size]=300');

    if (Array.isArray(response.locations)) {
      let results;

      // Sort by distance only.
      if (args.sortByDistance && !args.filter) {
        console.log('sortByDistance only');
        results = sortByDistance(args.sortByDistance, response.locations).map(location =>
          this.locationNormalizer(location)
        );
      }

      // Filter only.
      if (args.filter && !args.sortByDistance) {
        // Open now only.
        if (args.filter.openNow) {
          console.log('filter: open now only');
          results = filterByOpenNow(response.locations).map(location =>
            this.locationNormalizer(location)
          );
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
          results = sortByDistance(args.sortByDistance, filterByOpenNow(response.locations)).map(location =>
            this.locationNormalizer(location)
          );
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

      return this.processResults(results, args);
    } else {
      return [];
    }
  }
}

export default RefineryApi;
