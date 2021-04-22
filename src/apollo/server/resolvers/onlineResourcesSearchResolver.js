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

const onlineResourcesSearchResolver = {
  Query: {
    allOnlineResourcesSearch: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getAllOnlineResourcesSearch(args);

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
  },
  OnlineResource: {
    id: onlineResource => {
      return onlineResource.uuid;
    },
    name: onlineResource => {
      return onlineResource.title;
    },
    description: onlineResource => {
      return onlineResource.summary;
    }
  }
}

export default onlineResourcesSearchResolver;