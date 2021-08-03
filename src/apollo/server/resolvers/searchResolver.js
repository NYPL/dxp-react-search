// DayJS
const dayjs = require('dayjs');
// DayJS timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
// Set default timezone.
dayjs.tz.setDefault('America/New_York');
// Ip checking
import requestIp from "request-ip";
// Utils
import { 
  ONLINE_RESOURCES_ALL_BRANCH_UUID,
  ONLINE_RESOURCES_OFFSITE_UUID
} from './../../../utils/config';
// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

const searchResolver = {
  Query: {
    allSearchDocuments: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllSearchDocuments(args);
      const clientIp = await requestIp.getClientIp(dataSources.drupalApi.context.req);

      // Create a dayjs date object, using default timezone.
      // @see https://github.com/iamkun/dayjs/issues/1227
      // Format datetime in ISO8601, i.e, 2020-10-27T12:00:00-04:00.
      const now = dayjs.tz();

      return {
        items: response.results,
        pageInfo: {
          totalItems: response.results.length ? response.pager.count : 0,
          limit: response.results.length ? response.pager.items_per_page: 0,
          pageNumber: response.results.length ? response.pager.current_page + 1 : 0,
          pageCount: response.results.length ? response.pager.pages : 0,
          timestamp: now,
          clientIp: clientIp
        }
      }
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
      return 'OnlineResourceDocument';
    }
  },
  OnlineResourceDocument: {
    id: document => document.uuid,
    name: document => document.title.replace("&#039;", "'"),
    description: document => document.summary,
    slug: document => document.path,
    mostPopular: document => document['most-popular'],
    accessibilityLink: document => document['accessibility-details']?.url,
    termsConditionsLink: document => document['terms-link']?.url,
    privacyPolicyLink: document => document['privacy-link']?.url,
    notes: document => document['comments-public'],
    language: document => document['resource-language'],
    subjects: document => document.subjects.length ? document.subjects : null,
    accessibleFrom: document => {
      return document['accessible-from'].length ? 
        document['accessible-from'] : null
    },
    accessLocations: document => {
      const accessLocations = document['access-locations'];
      // Add offsite and onsite items to accessLocations based on accessibleFrom.
      // @TODO test if this works for ones with both offsite and onsite?
      if (document['accessible-from'].includes('offsite')) {
        accessLocations.push({
          uuid: ONLINE_RESOURCES_OFFSITE_UUID,
          title: "Outside the Library",
          url: null,
          // @TODO do you use this?
          drupalInternalValue: document['accessible-from']
        });
      } else if (document['accessible-from'].includes('onsite')) {
        accessLocations.push({
          uuid: ONLINE_RESOURCES_ALL_BRANCH_UUID,
          title: "All Branch Libraries",
          url: null,
          // @TODO do you use this?
          drupalInternalValue: document['accessible-from']
        });
      }
      return accessLocations;
    },
    resourceUrl: document => {
      // Defaults to main url.
      let resourceUrl = document['main-url']?.url;
      if (
        document['accessible-from'].includes('onsite')
        && document['onsite-branch-url'] !== null
      ) {
        resourceUrl = document['onsite-branch-url'].url;
      } else if (
        document['accessible-from'].includes('offsite')
        && document['offsite-url'] !== null
      ) {
        resourceUrl = document['offsite-url'].url;
      }
      return resourceUrl;
    },
    isCoreResource: (parent, args, context, info) => {
      const subjectsFromQueryParams = info.variableValues.subjects;
      const recommendedSubjects = parent['recommended-subjects'];
      let isCoreResource = false;
      // No query params for subjects, so return false.
      if (subjectsFromQueryParams === null) {
        return isCoreResource;
      }
      // Build an array of recommended subject ids.
      let recommendedSubjectsArray = [];
      recommendedSubjects?.map(recommendedSubject => {
        recommendedSubjectsArray.push(recommendedSubject.id);
      });
      // Check for any matches.
      const coreResourceMatch = subjectsFromQueryParams
        .filter(e => recommendedSubjectsArray.includes(e));
      
      if (coreResourceMatch.length) {
        isCoreResource = true;
      }
      return isCoreResource;
    },
    isFreeResource: document => document['is-free-resource'],
    authenticationType: document => {
      if (document['authentication-type'] === 'None') {
        return null;
      } else {
        return document['authentication-type'].replace(/\s+/g, '_').toLowerCase();
      }
    },
    availabilityStatus: document => {
      let availabilityStatus;
      if (
        document['authentication-type'] === 'Vendor authentication'
        || document['authentication-type'] === 'NYPL authentication'
      ) {
        availabilityStatus = 'card_required';
      }
      if (!document['accessible-from'].includes('offsite')) {
        availabilityStatus = 'onsite_only';
      }

      return availabilityStatus;
    }
  },
  Subject: {
    id: subject => subject.uuid,
    name: subject => subject.title
  },
  AccessLocation: {
    id: accessLocation => accessLocation.uuid,
    name: accessLocation => accessLocation.title,
    url: accessLocation => {
      let accessLocationUrl = accessLocation.url;
      if (accessLocation?.url) {
        const baseDomains = [
          'http://localhost:8080',
          'http://sandbox-d8.nypl.org',
          'http://qa-d8.nypl.org',
          'http://d8.nypl.org'
        ];
        baseDomains.forEach(baseDomain => {
          if (accessLocation.url.includes(baseDomain)) {
            accessLocationUrl = accessLocation.url
              .replace(baseDomain, NEXT_PUBLIC_NYPL_DOMAIN);
          }
        });
      }
      return accessLocationUrl;
    }
  }
}

export default searchResolver;