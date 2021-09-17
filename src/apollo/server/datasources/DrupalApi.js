import { HTTPCache, RESTDataSource } from "apollo-datasource-rest";
const { DRUPAL_API } = process.env;

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

  // Search/Solr.
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

  async getAutoSuggestions(args) {
    const response = await this.get(`/api/search-online-resources-autosuggest`);
    return response.results;
  }

  // /jsonapi/taxonomy_term/subject?fields[taxonomy_term--subject]=name,drupal_internal__tid,vid,uuid,parent&page[limit]=200&jsonapi_include=1
  async getAllFiltersByGroupId(id, type, limiter) {
    // Special handling for availability.
    if (id === "availability") {
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
      apiPath = `/jsonapi/taxonomy_term/${id}?jsonapi_include=1&fields[taxonomy_term--${id}]=name,drupal_internal__tid,vid,uuid,parent&page[limit]=200`;

      if (limiter) {
        apiPath = `${apiPath}&filter[field_lts_content_type]=${limiter}`;
      }
    }

    if (type === "content") {
      apiPath = `jsonapi/node/${id}?jsonapi_include=1&fields[node--${id}]=title,drupal_internal__nid&page[limit]=200&&sort[sort-title][path]=title&sort[sort-title][direction]=ASC`;
    }

    const response = await this.get(apiPath);

    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  async getIpAccessCheck(clientIp) {
    const response = await this.get(`/api/ip?testMode=true&ip=${clientIp}`);
    if (response) {
      return response;
    }
  }

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

  async getTermBySlug(slug, vocabulary) {
    // @TODO this won't always have an image?
    const response = await this.get(
      `/jsonapi/taxonomy_term/${vocabulary}/${slug}?include=field_ers_image.field_media_image&jsonapi_include=1`
    );
    if ("data" in response) {
      return response;
    } else {
      return [];
    }
  }

  // @TODO add featured, and also pass query fields.
  async getAllNodesByContentType(
    contentType,
    limit,
    pageNumber,
    filter,
    sortBy,
    queryFields
  ) {
    let apiPath = `/jsonapi/node/${contentType}?jsonapi_include=1`;

    // Check for fields to include.
    let includeFields = [];
    if ("image" in queryFields.items) {
      includeFields.push("field_ers_media_image.field_media_image");
    }
    if ("locations" in queryFields.items) {
      includeFields.push("field_erm_location");
    }
    if (includeFields.length) {
      apiPath = `${apiPath}&include=${includeFields.join(",")}`;
    }

    // Pagination.
    if (limit && pageNumber) {
      // Calculate offset
      let offset = 0;
      if (pageNumber === 2) {
        offset = limit;
      } else {
        offset = limit * (pageNumber - 1);
      }
      apiPath = `${apiPath}&page[offset]=${offset}&page[limit]=${limit}`;

      //console.log(pageNumber);
      //console.log(`offset: ${offset}`);
    }

    if (filter && "mostPopular" in filter) {
      apiPath = `${apiPath}&filter[mostPopular][condition][path]=field_is_most_popular&filter[mostPopular][condition][operator]=IS NOT NULL&sort=field_is_most_popular`;
    }
    if (filter && "featured" in filter && filter.featured !== null) {
      apiPath = `${apiPath}&filter[field_bs_featured]=1`;
    }

    // @TODO could convert this to reuseable function?
    // Channels filter.
    if (filter && "channels" in filter && filter.channels) {
      filter.channels.map((channel) => {
        const filters = this.filterMultiValueEntityRef(
          channel,
          "field_erm_channels"
        );
        apiPath = `${apiPath}&${filters}`;
      });
    }
    // Subjects filter.
    if (filter && "subjects" in filter && filter.subjects) {
      filter.subjects.map((subject) => {
        const filters = this.filterMultiValueEntityRef(
          subject,
          "field_erm_subjects"
        );
        apiPath = `${apiPath}&${filters}`;
      });
    }
    // Libraries filter.
    if (filter && "libraries" in filter && filter.libraries) {
      filter.libraries.map((library) => {
        const filters = this.filterMultiValueEntityRef(
          library,
          "field_erm_location"
        );
        apiPath = `${apiPath}&${filters}`;
      });
    }
    // Divisions filter.
    if (filter && "divisions" in filter && filter.divisions) {
      filter.divisions.map((division) => {
        const filters = this.filterMultiValueEntityRef(
          division,
          "field_erm_divisions"
        );
        apiPath = `${apiPath}&${filters}`;
      });
    }
    //
    if (sortBy) {
      apiPath = `${apiPath}&sort[sort-created][path]=created&sort[sort-created][direction]=DESC`;
    }

    const response = await this.get(apiPath);
    if (Array.isArray(response.data)) {
      return response;
    } else {
      return [];
    }
  }

  // Helper methods.

  /*
    Build filters for multi value entity reference filters.
    @see https://www.drupal.org/project/drupal/issues/3066202#comment-13181270
  */
  filterMultiValueEntityRef(item, fieldName) {
    const groupName = `${fieldName}-${item}-and`;
    const filterName = `${fieldName}-${item}`;
    const conditionPath = `${fieldName}.meta.drupal_internal__target_id`;
    // Query param parts.
    const filterConjunction = `filter[${groupName}][group][conjunction]=AND`;
    const filterConditionValue = `filter[${filterName}][condition][value]=${item}`;
    const filterConditionPath = `filter[${filterName}][condition][path]=${conditionPath}`;
    const filterConditionMemberOf = `filter[${filterName}][condition][memberOf]=${groupName}`;
    return `${filterConjunction}&${filterConditionValue}&${filterConditionPath}&${filterConditionMemberOf}`;
  }
}

export default DrupalApi;
