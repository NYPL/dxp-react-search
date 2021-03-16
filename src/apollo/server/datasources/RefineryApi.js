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
    const [librariesResponse, divisionsResponse, centersResponse] = await Promise.all([
      this.get('/locations/v1.0/locations'),
      this.get('/locations/v1.0/divisions'),
      this.get('/locations/v1.0/centers'),
    ]);

    if (
      Array.isArray(librariesResponse.locations) 
      && Array.isArray(divisionsResponse.divisions)
      && Array.isArray(centersResponse.centers)
    ) {
      return [
        ...librariesResponse.locations, 
        ...divisionsResponse.divisions, 
        ...centersResponse.centers
      ];
    } else {
      return [];
    }
  }

  async getAllTerms() {
    const filters = await this.get('/locations/v1.0/searchfilters');
    return filters.data.filters;
  }
}

export default RefineryApi;
