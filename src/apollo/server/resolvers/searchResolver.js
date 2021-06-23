// Env vars
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
// DayJS
const dayjs = require('dayjs');
// DayJS timezone
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
// Set default timezone.
dayjs.tz.setDefault('America/New_York');

const searchResolver = {
  Query: {
    allSearchDocuments: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllSearchDocuments(args);

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
          timestamp: now
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
    mostPopular: document => {
      return document['most-popular']
    },
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
    accessLocations: document => document['access-locations']
    /*
    @TODO
    accessLocations
    */
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
  }
}

export default searchResolver;