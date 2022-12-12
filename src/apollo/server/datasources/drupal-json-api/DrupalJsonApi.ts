import { RESTDataSource } from "@apollo/datasource-rest";
import getAccessToken from "../../../../utils/getAccessToken";
import toApolloError from "../../../../utils/to-apollo-error";
const { DRUPAL_API } = process.env;

// @TODO Change to use JsonApiResourceObject
type JsonApiResource = { [key: string]: any };

class DrupalJsonApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DRUPAL_API;

    /**
     * Disables all GET request caching.
     *
     * Fixes 304 not modified issue when Drupal's page cache is enabled.
     * This essentially disables the RESTDataSource cacheing of remote
     * api endpoints responses, which is not really necessary anyway, since
     * Apollo client cache (in memory) is already doing the heavy lifting.
     *
     * This is the Apollo datasource-rest v4 version of doing this in v3:
     *
     * initialize({ context }) {
     *   this.context = context;
     *   this.httpCache = new HTTPCache();
     * }
     *
     * Original github thread on this @see https://github.com/apollographql/apollo-server/issues/1562
     *
     * This might be changing in a future version, @see https://github.com/apollographql/datasource-rest/pull/100
     */
    this.memoizeGetRequests = false;
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
  ): Promise<JsonApiResource[]> {
    if (isPreview) {
      try {
        const accessToken = await getAccessToken();
        const response = await this.get(apiPath, {
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
  ): Promise<JsonApiResource> {
    if (isPreview) {
      try {
        const accessToken = await getAccessToken();
        const response = await this.get(apiPath, {
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
