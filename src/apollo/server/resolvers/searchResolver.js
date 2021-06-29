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
          totalItems: response.pager.count,
          limit: response.pager.items_per_page,
          // @TODO Check with Matt/DS team, but DS Pagination uses 1 not 0
          // for the the first page?
          pageNumber: response.pager.current_page + 1,
          pageCount: response.pager.pages,
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
    name: document => document.title,
    description: document => document.summary,
    // @TODO Need to remove this have Drupal output the slug/url path only.
    slug: document => {
      if (document.url.includes('localhost')) {
        return document.url.replace('http://localhost:8080', '');
      } else {
        return document.url.replace('http://sandbox-d8.nypl.org', '');
      }
    },
    mostPopular: document => document['most-popular'],
    accessibilityLink: document => 'https://www.nypl.org',
    termsConditionsLink: document => 'https://about.jstor.org/terms/',
    privacyPolicyLink: document => 'https://about.jstor.org/privacy/',
    notes: document => 'Subject coverage includes Asian studies, ecology, economics, education, finance, history, literature, mathematics, philosophy, political science, population studies, science, and sociology.',
    updateFrequency: document => 'Periodically',
    printEquivalent: document => 'Many of the journals included in JSTOR are available in traditional print or microform formats at The New York Public Library. Check the Library Catalog for holdings.',
    format: document => 'Web',
    language: document => 'English',
    outputType: document => 'Print, Download',
    subjects: document => document.subjects,
    accessibleFrom: document => document['accessible-from'],
    accessLocations: document => {
      const accessLocations = document['access-locations'];
      // Add offsite and onsite items to accessLocations based on accessibleFrom.
      // @TODO test if this works for ones with both offsite and onsite?
      if (document['accessible-from'] === 'offsite') {
        accessLocations.push({
          uuid: ONLINE_RESOURCES_OFFSITE_UUID,
          title: "Outside the Library",
          url: null,
          drupalInternalValue: document['accessible-from']
        });
      } else if (document['accessible-from'] === 'onsite') {
        accessLocations.push({
          uuid: ONLINE_RESOURCES_ALL_BRANCH_UUID,
          title: "All Branch Libraries",
          url: null,
          drupalInternalValue: document['accessible-from']
        });
      }
      return accessLocations;
    },
    resourceUrl: document => {
      let resourceUrl;
      switch (document['accessible-from']) {
        case 'offsite':
          if (document['offsite-url'] !== null) {
            resourceUrl = document['offsite-url'].url;
          } else if (document['main-url'] !== null) {
            resourceUrl = document['main-url'].url;
          }
          break;
        case 'onsite':
          if (document['onsite-branch-url'] !== null) {
            resourceUrl = document['onsite-branch-url'].url;
          } else if (document['main-url'] !== null) {
            resourceUrl = document['main-url'].url;
          }
          break;
        /*default:
          resourceUrl = document['main-url'] !== null ? document['main-url'].url : null;
        */       
      }
      return resourceUrl;
    }
  },
  Subject: {
    id: subject => {
      return subject.uuid;
    },
    name: subject => {
      return subject.title;
    },
  },
  AccessLocation: {
    id: accessLocation => {
      return accessLocation.uuid;
    },
    name: accessLocation => {
      return accessLocation.title;
    },
    url: accessLocation => {
      return accessLocation.url;
    },
  }
}

export default searchResolver;