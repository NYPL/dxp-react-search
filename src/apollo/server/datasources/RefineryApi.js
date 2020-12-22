import { RESTDataSource } from 'apollo-datasource-rest';
const { REFINERY_API } = process.env;

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
  }

  async getAllLocations() {
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/locations
    //const librariesResponse = await this.get('/locations/v1.0/locations');
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/divisions
    //const divisionsResponse = await this.get('/locations/v1.0/divisions');
    
    // Promise approach.
    const [librariesResponse, divisionsResponse] = await Promise.all([
      this.get('/locations/v1.0/locations'),
      this.get('/locations/v1.0/divisions'),
    ]);

    if (Array.isArray(librariesResponse.locations) && Array.isArray(divisionsResponse.divisions)) {
      return [...divisionsResponse.divisions, ...librariesResponse.locations];
    } else {
      return [];
    }
  }
}

export default RefineryApi;
