import { RESTDataSource } from "@apollo/datasource-rest";
const { REFINERY_API } = process.env;

class RefineryApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = REFINERY_API;
    // @TODO what did this do? it doesn't work in v4
    // this.initialize({});
  }

  async getAllLocations() {
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/locations
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/divisions
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/centers

    // Promise await all.
    const [librariesResponse, divisionsResponse, centersResponse] =
      await Promise.all([
        this.get("/locations/v1.0/locations"),
        this.get("/locations/v1.0/divisions"),
        this.get("/locations/v1.0/centers"),
      ]);

    if (
      Array.isArray(librariesResponse.locations) &&
      Array.isArray(divisionsResponse.divisions) &&
      Array.isArray(centersResponse.centers)
    ) {
      return [
        ...librariesResponse.locations,
        ...divisionsResponse.divisions,
        ...centersResponse.centers,
      ];
    } else {
      return [];
    }
  }

  async getAllTerms() {
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/searchfilters
    // @see https://refinery.nypl.org/api/nypl/locations/v1.0/divisions

    // @TODO We include the divisions here to control what subject terms
    // are included for locations. This should be removed in the future.
    const [filtersResponse, divisionsResponse] = await Promise.all([
      this.get("/locations/v1.0/searchfilters"),
      this.get("/locations/v1.0/divisions"),
    ]);

    if (
      Array.isArray(filtersResponse.data.filters) &&
      Array.isArray(divisionsResponse.divisions)
    ) {
      return {
        searchFilters: filtersResponse.data.filters,
        divisions: divisionsResponse.divisions,
      };
    } else {
      return [];
    }
  }
}

export default RefineryApi;
