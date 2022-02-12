import { DataSourceConfig } from "apollo-datasource";
import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
import getAccessToken from "../../../../utils/getAccessToken";
const { DRUPAL_API } = process.env;

// @TODO Change to use JsonApiResourceObject
type JsonApiResource = { [key: string]: any };

class DrupalJsonApi<TContext = any> extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DRUPAL_API;
  }

  /**
   * Fixes 304 not modified issue when Drupal's page cache is enabled.
   * This essentially disables the RESTDataSource cacheing of remote
   * api endpoints responses, which is not really necessary anyway, since
   * Apollo client cache (in memory) is already doing the heavy lifting.
   */
  initialize(config: DataSourceConfig<TContext>): void {
    this.context = config.context;
    this.httpCache = new HTTPCache();
  }

  // D8 api is a json api, which datasource-rest does not handle by default.
  parseBody(response: JsonApiResource) {
    if (response.headers.get("Content-Type").includes("json")) {
      return response.json();
    } else {
      return response.text();
    }
  }

  async getDecoupledRouter(args: { path: string }) {
    // Get resource url from path.
    let apiPath = `/router/translate-path?path=${args.path}`;
    const response = await this.get(apiPath);
    return response;
  }

  async getCollectionResource(apiPath: string): Promise<JsonApiResource[]> {
    const response = await this.get(apiPath);
    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getIndividualResource(
    apiPath: string,
    isPreview: boolean
  ): Promise<JsonApiResource> {
    let response;
    if (isPreview) {
      const accessToken = await getAccessToken();
      response = await this.get(apiPath, undefined, {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${accessToken.access_token}`,
        },
      });
    } else {
      response = await this.get(apiPath);
    }
    return response.data;
  }
}

export default DrupalJsonApi;
