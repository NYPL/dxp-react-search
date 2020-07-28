import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  // Tidy up the response from Refinery.
  locationReducer(location) {
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

    // Test to see what happens if refinery matches google geocoder service.
    /*if (location.slug === '125th-street') {
      location.geolocation.coordinates[1] = 40.8030583;
      location.geolocation.coordinates[0] = -73.9347641;
    }
    */

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
    }
  }

  async getAllLocations() {
    const response = await this.get('/locations/v1.0/locations?page[size]=75');

    if (Array.isArray(response.locations)) {
      return response.locations.map(location => this.locationReducer(location));
    } else {
      return [];
    }
  }
}

export default RefineryApi;
