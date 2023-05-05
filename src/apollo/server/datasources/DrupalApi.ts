import { RESTDataSource } from "@apollo/datasource-rest";
import toApolloError from "./../../../utils/to-apollo-error";
const { DRUPAL_API } = process.env;

class DrupalApi extends RESTDataSource {
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
  parseBody(response: any) {
    if (response.headers.get("Content-Type").includes("json")) {
      return response.json();
    } else {
      return response.text();
    }
  }

  /* ---------- ONLINE RESOURCES ---------- */
  async getAllSearchDocuments(args: any) {
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
      args.filter.subjects.map((subject: string) => {
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
      args.filter.audience_by_age.map((audienceItem: string) => {
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

  async getSearchDocument(args: any) {
    const response = await this.get(
      `/api/search-online-resources?uuid=${args.id}`
    );
    return response.results;
  }

  async getIpAccessCheck(clientIp: string) {
    const response = await this.get(`/api/ip?testMode=true&ip=${clientIp}`);
    if (response) {
      return response;
    }
  }

  /* ---------- DECOUPLED DRUPAL ---------- */
  async getDecoupledRouter(args: any) {
    const apiPath = `/router/translate-path?path=${args.path}`;
    try {
      const response = await this.get(apiPath);
      return response;
    } catch (error: any) {
      throw toApolloError(error);
    }
  }

  async getAutoSuggestions() {
    const response = await this.get("/api/search-online-resources-autosuggest");
    return response.results;
  }
}

export default DrupalApi;
