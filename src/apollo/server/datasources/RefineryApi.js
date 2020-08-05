import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;
import sortByDistance from './../../../utils/sortByDistance';

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
      geoLocation: {
        lat: location.geolocation.coordinates[1],
        lng: location.geolocation.coordinates[0],
      },
      todayHours: {
        start: todayHoursStart,
        end: todayHoursEnd
      },
    }
  }

  async getAllLocations(args) {
    const response = await this.get('/locations/v1.0/locations?page[size]=300');

    if (Array.isArray(response.locations)) {
      if (args.sortByDistance) {
        console.log('sort by distance');
        const sortedLocations = sortByDistance(args.sortByDistance, response.locations);
        return sortedLocations.map(location => this.locationNormalizer(location));
      } else {
        console.log('no sort');
        return response.locations.map(location => this.locationNormalizer(location));
      }
    } else {
      return [];
    }
  }
}

export default RefineryApi;
