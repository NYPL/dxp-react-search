import requestIp from 'request-ip';
// Utils
import { 
  ONLINE_RESOURCES_ALL_BRANCH_UUID,
  ONLINE_RESOURCES_OFFSITE_UUID,
  ONLINE_RESOURCES_ONSITE_UUID
} from './../../../utils/config';

const ipAccessCheckResolver = {
  Query: {
    allLocationMatches: async (parent, args, { dataSources }) => {
      // args.ip will be from query param for testing, otherwise use
      // the actual client ip from the request headers.
      let clientIp;
      if (args.ip) {
        clientIp = args.ip;
      } else {
        clientIp = await requestIp.getClientIp(dataSources.drupalApi.context.req);
      }

      const response = await dataSources.drupalApi.getIpAccessCheck(clientIp);

      // Manipulate data from api.
      let itemsArray = [];
      let matches = [];
      // Create an array of objects.
      for (let [key, locationItem] of Object.entries(response.locations)) {
        itemsArray.push(locationItem);
      }
      // Check for matches.
      itemsArray.map(item => {
        if (item.match) {
          matches.push(item)
        }
      });

      // @TODO better version if drupal api changes
      /*response.locations.map(item => {
        if (item.match) {
          matches.push(item)
        }
      })
      */

      // @TODO Fix this
      if (response.isOnsite) {
        matches.push({
          uuid: ONLINE_RESOURCES_ONSITE_UUID,
          name: 'Generic On Site',
          mapping_uuid: 'generic-onsite-mapping-id'
        })
      }

      if (response.isBranch) {
        matches.push({
          uuid: ONLINE_RESOURCES_ALL_BRANCH_UUID,
          name: 'All Branch Libraries',
          mapping_uuid: 'all-branch-libs-mapping-id'
        })
      }

      if (response.isResearch) {
        matches.push({
          uuid: 'fdgdfgdfgdfgdfgdf',
          name: 'All Research Libraries',
          mapping_uuid: 'all-research-libs-mapping-id'
        })
      }

      return {
        items: matches,
        pageInfo: {
          clientIp: clientIp
        }
      }
    }
  },
  LocationMatch: {
    id: locationMatch => {
      return locationMatch.mapping_uuid;
    },
    name: locationMatch => {
      return locationMatch.name;
    },
    locationId: locationMatch => {
      return locationMatch.uuid;
    },
  }
}

export default ipAccessCheckResolver;