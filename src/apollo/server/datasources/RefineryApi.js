import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  async getAllLocations() {
    const response = await this.get('/locations/v1.0/locations');
    
    // @TODO add try/catch and error handling.
    if (Array.isArray(response.locations)) {
      return response.locations;
    } else {
      return [];
    }
  }
}

export default RefineryApi;
