import { DataSourceConfig } from "apollo-datasource";
import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
import getAccessToken from "../../../../utils/getAccessToken";
import { toApolloError } from "apollo-server-errors";
const { DRUPAL_API } = process.env;

// @TODO Change to use JsonApiResourceObject
type JsonApiResource = { [key: string]: any };
type JsonApiIndividualResource = {
  jsonapi: any;
  data: JsonApiResource;
  meta: any;
  links: any;
};
type JsonApiCollectionResource = {
  jsonapi: any;
  data: JsonApiResource[];
  meta: any;
  links: any;
};
class DrupalJsonApi<TContext = any> extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DRUPAL_API;
    this.initialize({} as DataSourceConfig<any>);
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

  async getCollectionResource(
    apiPath: string,
    isPreview: boolean
  ): Promise<JsonApiCollectionResource> {
    if (isPreview) {
      try {
        const accessToken = await getAccessToken();
        const response = await this.get(apiPath, undefined, {
          headers: {
            Authorization: `Bearer ${accessToken?.access_token}`,
          },
        });
        return response;
      } catch (error: any) {
        throw toApolloError(error);
      }
    } else {
      try {
        const response = await this.get(apiPath);
        return response;
      } catch (error: any) {
        throw toApolloError(error);
      }
    }
  }

  async getIndividualResource(
    apiPath: string,
    isPreview: boolean
  ): Promise<JsonApiIndividualResource> {
    if (isPreview) {
      try {
        const accessToken = await getAccessToken();
        const response = await this.get(apiPath, undefined, {
          headers: {
            Authorization: `Bearer ${accessToken?.access_token}`,
          },
        });
        return response.data;
      } catch (error: any) {
        throw toApolloError(error);
      }
    } else {
      try {
        const response = await this.get(apiPath);
        return response.data;
      } catch (error: any) {
        throw toApolloError(error);
      }
    }
  }
}

export default DrupalJsonApi;
