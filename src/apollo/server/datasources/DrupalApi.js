import { RESTDataSource } from 'apollo-datasource-rest';
const { DRUPAL_API } = process.env;

class DrupalApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DRUPAL_API;
  }

  // D8 api is a json api, which datasource-rest does not handle by default.
  parseBody(response) {
    if (response.headers.get('Content-Type').includes('json')) {
      return response.json();
    } else {
      return response.text();
    }
  }

  async getAllResourceTopics() {
    const apiPath = `/jsonapi/taxonomy_term/resource_topic?sort=weight&include=field_ers_image.field_media_image`;
    const response = await this.get(apiPath);

    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getAllOnlineResources() {
    // Get 'Online Resource' nodes.
    // Remove node if field_is_most_popular is NULL
    // Sort by field_is_most_popular ASC
    // Return only 3 nodes.
    // @TODO Figure out clean way to make this work w/ indentation.
    const apiPath = `/jsonapi/node/online_resource?filter[mostPopular][condition][path]=field_is_most_popular&filter[mostPopular][condition][operator]=IS NOT NULL&sort=field_is_most_popular&page[limit]=3`;

    const response = await this.get(apiPath);
    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getAllOnlineResourcesSolr(args) {
    let apiPath = '/api/search-online-resources';

    // Filter by q.
    // /api/search-online-resources?sq=jstor
    if (
      args.filter
      && 'q' in args.filter
    ) {
      apiPath = `${apiPath}?sq=${args.filter.q}`;
    }
    
    const response = await this.get(apiPath);

    if (Array.isArray(response.results)) {
      return response;
    } else {
      return [];
    }
  }
}

export default DrupalApi;
