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

  async getAllLocations(args) {
    const response = await this.get('/locations/v1.0/locations?page[size]=300');

    if (Array.isArray(response.locations)) {
      // Sort by distance only.
      if (args.sortByDistance && !args.filter) {
        console.log('sortByDistance only');
        return sortByDistance(args.sortByDistance, response.locations).map(location =>
          this.locationNormalizer(location)
        );
      }

      // Filter only.
      if (args.filter && !args.sortByDistance) {
        // Open now only.
        if (args.filter.openNow) {
          console.log('filter: open now only');
          return filterByOpenNow(response.locations).map(location =>
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
          const openNowLocations = filterByOpenNow(response.locations);
          return sortByDistance(args.sortByDistance, openNowLocations).map(location =>
            this.locationNormalizer(location)
          );
        }
        // Sort by distance only.
        else if (
          args.sortByDistance.originLat
          && args.sortByDistance.originLng
        ) {
          console.log('filter is false, sort by distance only.');
          return sortByDistance(args.sortByDistance, response.locations).map(location =>
            this.locationNormalizer(location)
          );
        }
      }

      // Default sort, alphabetical.
      console.log('default sort!');
      return response.locations.sort(sortByName).map(location =>
        this.locationNormalizer(location)
      );
    } else {
      return [];
    }
  }
}

export default RefineryApi;
