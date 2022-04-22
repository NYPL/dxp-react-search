//import { DataSourceConfig } from "apollo-datasource";
import {
  HTTPCache,
  RESTDataSource,
  RequestOptions,
} from "apollo-datasource-rest";
//import type { ValueOrPromise } from "apollo-server-types";
const { COMMUNICO_API, COMMUNICO_CLIENT_ID, COMMUNICO_SECRET } = process.env;

export type AccessToken = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

interface CommunicoResponse {
  status: string;
  data: any;
}

class CommunicoApi<TContext = any> extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = COMMUNICO_API;
    // Needs for SSG
    // @see https://github.com/apollographql/apollo-server/issues/2240
    this.httpCache = new HTTPCache();
  }

  async getAccessToken() {
    if (!COMMUNICO_CLIENT_ID || !COMMUNICO_SECRET) {
      return null;
    }

    const body = new URLSearchParams({
      client_id: COMMUNICO_CLIENT_ID,
      client_secret: COMMUNICO_SECRET,
      grant_type: "client_credentials",
    });

    const response = await fetch(`${COMMUNICO_API}/v3/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    // const response = await this.post(`/v3/token`, undefined, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: body.toString(),
    // });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result: AccessToken = await response.json();
    return result;
  }

  // Sets the bearer token for the api request.
  // @see http://communicocollege.com/communico-client-api-1137
  async willSendRequest(request: any) {
    //const COMMUNICO_BEARER_TOKEN = "172a5f5186249a070709d3352d2731cac77cb040";

    const accessToken = await this.getAccessToken();
    // @ts-ignore
    const COMMUNICO_BEARER_TOKEN = accessToken.access_token;

    if (!request.headers) {
      request.headers = {};
    }

    request.headers = {
      Authorization: `Bearer ${COMMUNICO_BEARER_TOKEN}`,
    };
  }

  // @see https://api.communico.co/docs/#!/attend/get_v3_attend_events
  async getCollectionResource(
    resourceType: "events" | "ages" | "types",
    limit?: number,
    pageNumber?: number,
    sort?: any,
    filter?: any
  ): Promise<CommunicoResponse> {
    let apiPath = `/v3/attend/${resourceType}`;

    if (resourceType === "events") {
      apiPath = `${apiPath}?fields=featuredImage,eventImage,ages,types,customQuestions`;
      // Add limit and offset.
      if (limit && pageNumber) {
        // Calculate offset
        let offset = 0;
        if (pageNumber === 2) {
          offset = limit;
        } else {
          offset = limit * (pageNumber - 1);
        }
        apiPath = `${apiPath}&limit=${limit}&start=${offset}`;
      }
      // Add sorting.
      if (typeof sort === "object" && sort !== null) {
        const { field, direction } = sort;
        apiPath = `${apiPath}&sortBy=${field}&sortOrder=${direction}`;
      }
    }

    // Filters
    if (typeof filter === "object" && filter !== null) {
      for (const property in filter) {
        if (property === "audiences") {
          // Replace - with spaces for sending query params to api.
          let newArray: string[] = [];
          filter[property].forEach((item: string) => {
            newArray.push(item.replace(/-/g, " "));
          });
          const items = newArray.join(",");
          apiPath = `${apiPath}&ages=${items}`;
        }
        if (property === "eventTypes") {
          // Replace - with spaces for sending query params to api.
          let newArray: string[] = [];
          filter[property].forEach((item: string) => {
            newArray.push(item.replace(/-/g, " "));
          });
          const items = newArray.join(",");
          apiPath = `${apiPath}&types=${items}`;
        }
      }
    }
    const response = await this.get(apiPath);
    return response;
  }

  // @see https://api.communico.co/docs/#!/attend/get_v3_attend_events_eventId
  async getIndividualResource(id: string): Promise<CommunicoResponse> {
    let apiPath = `/v3/attend/events/${id}?fields=featuredImage,eventImage,ages,types,customQuestions`;

    const response = await this.get(apiPath);
    return response;
  }
}

export default CommunicoApi;
