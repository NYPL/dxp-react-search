import { RESTDataSource } from 'apollo-datasource-rest';
const { D8_JSON_API } = process.env;

class DrupalApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = D8_JSON_API;
  }

  // D8 api is a json api, which datasource-rest does not handle by default.
  parseBody(response) {
    if (response.headers.get('Content-Type').includes('json')) {
      return response.json();
    } else {
      return response.text();
    }
  }

  // Tidy up the response from Drupal.
  locationNormalizer(location) {
    // D8 doesn't have geo data yet, so just hardcode something
    // so the map doesn't completely break.
    const defaultGeoCords = {
      lat: 40.7532,
      lng: -73.9822
    };

    return {
      id: location.id,
      name: location.attributes.title,
      status: location.attributes.status,
      address_line1: location.attributes.field_as_address.address_line1,
      address_line2: location.attributes.field_as_address.address_line2,
      locality: location.attributes.field_as_address.locality,
      administrative_area: location.attributes.field_as_address.administrative_area,
      postal_code: location.attributes.field_as_address.postal_code,
      phone: location.attributes.field_tels_phone,
      wheelchairAccess: location.attributes.field_lts_wheelchair_access,
      geoLocation: {
        lat: defaultGeoCords.lat,
        lng: defaultGeoCords.lng,
      },
      open: true,
      todayHours: {
        start: '11:00',
        end: '21:00'
      },
    };
  }

  async getAllLocations(query) {
    // Rough draft of filtering json api by title field if query string/filter is included.
    //console.log('query: ' + query);
    let apiPath;
    if (query === undefined) {
      apiPath = '/node/library';
    } else {
      apiPath = '/node/library?filter[title][operator]=CONTAINS&filter[title][value]=' + query;
    }
    const response = await this.get(apiPath);

    if (Array.isArray(response.data)) {
      return response.data.map(location => this.locationNormalizer(location));
    } else {
      return [];
    }
  }
}

export default DrupalApi;
