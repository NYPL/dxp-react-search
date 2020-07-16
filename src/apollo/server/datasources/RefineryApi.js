import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  // Tidy up the response from Refinery.
  locationReducer(location) {
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
    }
  }

  async getAllLocations() {
    const response = await this.get('/locations/v1.0/locations?page[size]=35');

    if (Array.isArray(response.locations)) {
      return response.locations.map(location => this.locationReducer(location));
    } else {
      return [];
    }
  }
}

export default RefineryApi;
