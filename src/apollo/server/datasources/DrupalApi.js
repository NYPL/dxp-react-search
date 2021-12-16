import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
const { DRUPAL_API } = process.env;
import buildJsonApiPath from "./buildJsonApiPath";

class DrupalApi extends RESTDataSource {
  constructor() {
    super();
    // Temporary hard-code d9 backend for tugboat.
    //this.baseURL = "https://sandbox-d8.nypl.org";
    this.baseURL = DRUPAL_API;
  }

  /**
   * Fixes 304 not modified issue when Drupal's page cache is enabled.
   * This essentially disables the RESTDataSource cacheing of remote
   * api endpoints responses, which is not really necessary anyway, since
   * Apollo client cache (in memory) is already doing the heavy lifting.
   */
  initialize({ context }) {
    this.context = context;
    this.httpCache = new HTTPCache();
  }

  // D8 api is a json api, which datasource-rest does not handle by default.
  parseBody(response) {
    if (response.headers.get("Content-Type").includes("json")) {
      return response.json();
    } else {
      return response.text();
    }
  }

  /* ---------- ONLINE RESOURCES ---------- */
  async getAllSearchDocuments(args) {
    let apiPath = "/api/search-online-resources";

    // Filter by q.
    // /api/search-online-resources?sq=jstor
    if (args.filter && "q" in args.filter) {
      apiPath = `${apiPath}?sq=${encodeURIComponent(args.filter.q)}`;
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
    // /api/search-online-resources?resource-topics[]=522
    if (args.filter && "tid" in args.filter && args.filter.tid) {
      apiPath = `/api/search-online-resources?resource-topics[]=${args.filter.tid}`;
    }

    // Alpha filter
    // /api/search-online-resources?alpha=M
    if (args.filter && "alpha" in args.filter && args.filter.alpha) {
      // Only add query params if a letter, not all.
      if (args.filter.alpha !== "all") {
        apiPath = `${apiPath}&alpha=${args.filter.alpha}`;
      }
    }

    // Subjects
    // subjects[]=123&subjects[]=556
    if (args.filter && "subjects" in args.filter && args.filter.subjects) {
      args.filter.subjects.map((subject) => {
        apiPath = `${apiPath}&subjects[]=${subject}`;
      });
    }

    // Audience
    // audience_age[]=123
    if (
      args.filter &&
      "audience_by_age" in args.filter &&
      args.filter.audience_by_age
    ) {
      args.filter.audience_by_age.map((audienceItem) => {
        apiPath = `${apiPath}&audience[]=${audienceItem}`;
      });
    }

    // Availability
    if (
      args.filter &&
      "availability" in args.filter &&
      args.filter.availability
    ) {
      if (args.filter.availability.includes("no-restrictions")) {
        apiPath = `${apiPath}&accessible-from[]=offsite&authentication-type[]=none`;
      }
      if (args.filter.availability.includes("card-required")) {
        apiPath = `${apiPath}&accessible-from[]=offsite&authentication-type[]=nypl&authentication-type[]=vendor&authentication-type[]=ezproxy`;
      }
      if (args.filter.availability.includes("on-site-only")) {
        apiPath = `${apiPath}&accessible-from-not[]=offsite`;
      }
    }

    const response = await this.get(apiPath);

    if (Array.isArray(response.results)) {
      return response;
    } else {
      return [];
    }
  }

  async getSearchDocument(args) {
    const response = await this.get(
      `/api/search-online-resources?uuid=${args.id}`
    );
    return response.results;
  }

  async getIpAccessCheck(clientIp) {
    const response = await this.get(`/api/ip?testMode=true&ip=${clientIp}`);
    if (response) {
      return response;
    }
  }

  /* ---------- DECOUPLED DRUPAL ---------- */
  async getDecoupledRouter(args) {
    // Get resource url from path.
    let apiPath = `/router/translate-path?path=${args.path}`;
    const response = await this.get(apiPath);
    return response;
  }

  async getAutoSuggestions(args) {
    const response = await this.get(`/api/search-online-resources-autosuggest`);
    return response.results;
  }

  /* ---------- JSON:API ---------- */
  // @TODO update to use apiPath / util func approach.
  async getAllTermsByVocabulary(
    vocab,
    sortBy,
    limit,
    featured,
    limiter,
    queryFields
  ) {
    let apiPath = `/jsonapi/taxonomy_term/${vocab}?jsonapi_include=1`;
    // Temp workaround for only adding include if image is in gql query.
    if ("image" in queryFields) {
      apiPath = `${apiPath}&include=field_ers_image.field_media_image`;
    }
    if (featured) {
      apiPath = `${apiPath}&filter[field_bs_featured]=1`;
    }
    if (sortBy) {
      apiPath = `${apiPath}&sort=${sortBy}`;
    }
    if (limit) {
      apiPath = `${apiPath}&page[offset]=0&page[limit]=${limit}`;
    }
    if (limiter) {
      apiPath = `${apiPath}&filter[field_lts_content_type]=${limiter}`;
    }

    const response = await this.get(apiPath);

    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  // @TODO update to use apiPath / util func approach.
  async getTermById(id, vocabulary) {
    // @TODO this won't always have an image?
    const response = await this.get(
      `/jsonapi/taxonomy_term/${vocabulary}/${id}?include=field_ers_image.field_media_image&jsonapi_include=1`
    );
    if ("data" in response) {
      return response;
    } else {
      return [];
    }
  }

  // Get a colletion of filters by group id (entity type): either node (content type) or taxonomy (vocab).
  // /jsonapi/taxonomy_term/subject?fields[taxonomy_term--subject]=name,drupal_internal__tid,vid,uuid,parent&page[limit]=200&jsonapi_include=1
  // @TODO update to use apiPath / util func approach.
  async getAllFiltersByGroupId(groupId, type, limiter) {
    // Special handling for availability.
    if (groupId === "availability") {
      const availabilityFilterMock = {
        data: [
          {
            id: "aa50711e-ad06-4451-bc59-ae9821681ee2",
            drupal_internal__tid: "no-restrictions",
            name: "Available everywhere",
            vid: null,
            parent: [
              {
                id: "virtual",
                meta: {
                  drupal_internal__target_id: "virtual",
                },
              },
            ],
          },
          {
            id: "b820a733-80e8-462c-8922-1ddf99a4a5a0",
            drupal_internal__tid: "card-required",
            name: "Offsite with Library Card",
            vid: null,
            parent: [
              {
                id: "virtual",
                meta: {
                  drupal_internal__target_id: "virtual",
                },
              },
            ],
          },
          {
            id: "3e7eba04-e788-4ad1-8380-392b6cf5ebe3",
            drupal_internal__tid: "on-site-only",
            name: "On-Site Access Only",
            vid: null,
            parent: [
              {
                id: "virtual",
                meta: {
                  drupal_internal__target_id: "virtual",
                },
              },
            ],
          },
        ],
      };
      return availabilityFilterMock;
    }

    let apiPath;
    if (type === "taxonomy") {
      apiPath = `/jsonapi/taxonomy_term/${groupId}?jsonapi_include=1&fields[taxonomy_term--${groupId}]=name,drupal_internal__tid,vid,uuid,parent&page[limit]=200`;

      if (limiter) {
        apiPath = `${apiPath}&filter[field_lts_content_type]=${limiter}`;
      }
    }

    if (type === "content") {
      apiPath = `jsonapi/node/${groupId}?jsonapi_include=1&fields[node--${groupId}]=title,drupal_internal__nid&page[limit]=200&&sort[sort-title][path]=title&sort[sort-title][direction]=ASC`;
    }

    const response = await this.get(apiPath);

    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getAllNodesByContentType(apiPath) {
    const response = await this.get(apiPath);
    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getNodeById(apiPath) {
    const response = await this.get(apiPath);
    return response.data;
  }

  /* ---------- LEGACY CODE ---------- */
  // Connects to legacy taxonomy-filters api.
  // @TODO This will be removed when subjects taxonomy backend work is complete.
  // /api/taxonomy-filters?vocab=audience_by_age
  // /api/taxonomy-filters?vocab=subject&content_type=online_resource
  async getAllFiltersByGroupIdLegacy(id, limiter) {
    // Special handling for availability.
    if (id === "availability") {
      const availabilityFilterMock = {
        data: {
          id: "availability",
          terms: [
            {
              uuid: "aa50711e-ad06-4451-bc59-ae9821681ee2",
              tid: "no-restrictions",
              name: "Available everywhere",
              vid: null,
              parent_tid: "virtual",
              parent_uuid: "virtual",
            },
            {
              uuid: "b820a733-80e8-462c-8922-1ddf99a4a5a0",
              tid: "card-required",
              name: "Offsite with Library Card",
              vid: null,
              parent_tid: "virtual",
              parent_uuid: "virtual",
            },
            {
              uuid: "3e7eba04-e788-4ad1-8380-392b6cf5ebe3",
              tid: "on-site-only",
              name: "On-Site Access Only",
              vid: null,
              parent_tid: "virtual",
              parent_uuid: "virtual",
            },
          ],
          total_items: 3,
        },
      };
      return availabilityFilterMock;
    }

    let apiPath = `/api/taxonomy-filters?vocab=${id}`;

    if (limiter) {
      apiPath = `${apiPath}&content_type=${limiter}`;
    }

    const response = await this.get(apiPath);

    if (Array.isArray(response.data.terms)) {
      return response;
    } else {
      return [];
    }
  }
}

export default DrupalApi;
