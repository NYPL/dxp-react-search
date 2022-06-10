// DayJS
const dayjs = require("dayjs");
// DayJS timezone
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
// Set default timezone.
dayjs.tz.setDefault("America/New_York");
// Utils
import { ONLINE_RESOURCES_ALL_BRANCH_UUID } from "./../../../utils/config";
import getRequestIp from "./../../../utils/getRequestIp";
// Env vars
const { NEXT_PUBLIC_SERVER_ENV, DRUPAL_API, NEXT_PUBLIC_NYPL_DOMAIN } =
  process.env;

const searchResolver = {
  Query: {
    allSearchDocuments: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllSearchDocuments(args);
      const clientIp = await getRequestIp(dataSources.drupalApi.context.req);

      // Create a dayjs date object, using default timezone.
      // @see https://github.com/iamkun/dayjs/issues/1227
      // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
      const now = dayjs.tz();

      return {
        items: response.results,
        pageInfo: {
          totalItems: response.results.length ? response.pager.count : 0,
          limit: response.results.length ? response.pager.items_per_page : 0,
          pageNumber: response.results.length
            ? response.pager.current_page + 1
            : 0,
          pageCount: response.results.length ? response.pager.pages : 0,
          timestamp: now,
          clientIp: clientIp,
        },
      };
    },
    searchDocument: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getSearchDocument(args);
      return response[0];
    },
  },
  SearchDocument: {
    __resolveType(document, context, info) {
      // @TODO
      // For now, just return the single search document type we have.
      return "OnlineResourceDocument";
    },
  },
  OnlineResourceDocument: {
    id: (document) => document.uuid,
    name: (document) => document.title.replace("&#039;", "'"),
    description: (document) => document.summary,
    slug: (document) => document.path,
    mostPopular: (document) => document["most-popular"],
    accessibilityLink: (document) => document["accessibility-details"]?.url,
    termsConditionsLink: (document) => document["terms-link"]?.url,
    privacyPolicyLink: (document) => document["privacy-link"]?.url,
    notes: (document) => document["comments-public"],
    language: (document) => document["resource-language"],
    subjects: (document) =>
      document.subjects.length ? document.subjects : null,
    accessibleFrom: (document) => {
      return document["accessible-from"].length
        ? document["accessible-from"]
        : null;
    },
    accessLocations: (document) => {
      const accessLocations = document["access-locations"];
      if (document["accessible-from"].includes("onsite")) {
        accessLocations.unshift({
          uuid: ONLINE_RESOURCES_ALL_BRANCH_UUID,
          title: "All Branch Libraries",
          url: "#",
          // @TODO do you use this?
          drupalInternalValue: document["accessible-from"],
        });
      }
      return accessLocations;
    },
    resourceUrl: (document) => {
      // Defaults to main url.
      let resourceUrl = document["main-url"]?.url;
      if (
        document["accessible-from"].includes("onsite") &&
        document["onsite-branch-url"] !== null
      ) {
        resourceUrl = document["onsite-branch-url"].url;
      } else if (
        document["accessible-from"].includes("offsite") &&
        document["offsite-url"] !== null
      ) {
        resourceUrl = document["offsite-url"].url;
      }
      return resourceUrl;
    },
    isCoreResource: (parent, args, context, info) => {
      const subjectsFromQueryParams = info.variableValues.subjects;
      const recommendedSubjects = parent["recommended-subjects"];
      let isCoreResource = false;
      // No query params for subjects, so return false.
      if (subjectsFromQueryParams === null) {
        return isCoreResource;
      }
      // Build an array of recommended subject ids.
      let recommendedSubjectsArray = [];
      recommendedSubjects?.map((recommendedSubject) => {
        recommendedSubjectsArray.push(recommendedSubject.id);
      });
      // Check for any matches.
      const coreResourceMatch = subjectsFromQueryParams.filter((e) =>
        recommendedSubjectsArray.includes(e)
      );

      if (coreResourceMatch.length) {
        isCoreResource = true;
      }
      return isCoreResource;
    },
    isFreeResource: (document) => document["is-free-resource"],
    authenticationType: (document) => {
      if (document["authentication-type"] === "none") {
        return null;
      } else {
        return document["authentication-type"];
      }
    },
    availabilityStatus: (document) => {
      let availabilityStatus;
      if (
        document["authentication-type"] === "vendor" ||
        document["authentication-type"] === "nypl" ||
        document["authentication-type"] === "ezproxy"
      ) {
        availabilityStatus = "card_required";
      }
      if (!document["accessible-from"].includes("offsite")) {
        availabilityStatus = "onsite_only";
      }

      return availabilityStatus;
    },
  },
  Subject: {
    id: (subject) => subject.uuid,
    name: (subject) => subject.title,
  },
  AccessLocation: {
    id: (accessLocation) => accessLocation.uuid,
    name: (accessLocation) => accessLocation.title,
    url: (accessLocation) => {
      if (accessLocation?.url) {
        // Drupal api will return absolute urls with the nypl.org backend subdomain,
        // i.e., "https://drupal.nypl.org/locations/schwarzman"
        // Since the access location links are public facing, we replace this
        // domain with the public facing url, i.e, nypl.org or qa-www.nypl.org.
        // Strip out the http basic auth from DRUPAL_API env var.
        const DRUPAL_API_DOMAIN_ONLY =
          NEXT_PUBLIC_SERVER_ENV !== "production"
            ? DRUPAL_API.replace("https://nypl1:nypl1@", "https://")
            : DRUPAL_API;

        // Replace the url with our cleaned up url.
        const accessLocationUrl = accessLocation.url.replace(
          DRUPAL_API_DOMAIN_ONLY,
          NEXT_PUBLIC_NYPL_DOMAIN
        );
        return accessLocationUrl;
      }
      return null;
    },
  },
};

export default searchResolver;
