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

  async getResourceTopic(args) {    
    console.log(args.slug)
    //const response = await this.get(`/jsonapi/taxonomy_term/resource_topic?filter[drupal_internal__tid]=${args.slug}`);
    const response = await this.get(`/jsonapi/taxonomy_term/resource_topic/${args.slug}`);
    return response.data;
  }

  async getAllOnlineResources(args) {
    let apiPath = `/jsonapi/node/online_resource`;
    
    // Most popular filter.
    if (
      args.filter
      && 'mostPopular' in args.filter
    ) {
      apiPath = `${apiPath}?filter[mostPopular][condition][path]=field_is_most_popular&filter[mostPopular][condition][operator]=IS NOT NULL&sort=field_is_most_popular&page[limit]=3`;
    }
    
    // @TODO Add Limit?

    const response = await this.get(apiPath);
    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getAllSearchDocuments(args) {
    let apiPath = '/api/search-online-resources';

    // Filter by q.
    // /api/search-online-resources?sq=jstor
    if (
      args.filter
      && 'q' in args.filter
    ) {
      apiPath = `${apiPath}?sq=${args.filter.q}`;
    }

    // Pagination
    // &items_per_page=5&page=1
    if (args.limit && args.pageNumber !== null) {
      // Drupal solr wrapper uses 0 as page 1, so we adjust that here.
      const pageNumber = args.pageNumber - 1;
      
      apiPath = `${apiPath}&items_per_page=${args.limit}&page=${pageNumber}`;
    } else {
      apiPath = `${apiPath}&items_per_page=10&page=0`;
    }

    // Resource topic filter
    // /api/search-online-resources?resource_topics[]=522
    if (
      args.filter
      && 'tid' in args.filter
      && args.filter.tid
    ) {
      apiPath = '/api/search-online-resources';

      apiPath = `${apiPath}?resource_topics[]=${args.filter.tid}`;
    }
    
    const response = await this.get(apiPath);

    if (Array.isArray(response.results)) {
      return response;
    } else {
      return [];
    }
  }

  async getSearchDocument(args) {    
    const response = await this.get(`/api/search-online-resources?uuid=${args.id}`);
    return response.results;
  }

  async getOnlineResource(args) {
    // Get resource url from path.
    let routerPath = `/router/translate-path?path=${args.slug}`;
    const routerResponse = await this.get(routerPath);
    // Get resource.
    if (routerResponse) {
      const response = await this.get(routerResponse.jsonapi.individual);
      return response.data;
    }
  }

  async getDecoupledRouter(args) {
    // Get resource url from path.
    let apiPath = `/router/translate-path?path=${args.path}`;
    const response = await this.get(apiPath);
    return response;
  }
}

export default DrupalApi;
