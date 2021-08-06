import requestIp from 'request-ip';
// Utils
import { 
  ONLINE_RESOURCES_ALL_BRANCH_UUID,
  ONLINE_RESOURCES_ALL_RESEARCH_UUID,
  ONLINE_RESOURCES_OFFSITE_UUID,
  ONLINE_RESOURCES_ONSITE_UUID
} from './../../../utils/config';

const ipAccessCheckResolver = {
  Query: {
    allLocationMatches: async (parent, args, { dataSources }) => {
      // Get the context request.
      const contextRequest = dataSources.drupalApi.context.req;
      // Default to the request-ip value for the ip address.
      let ipAddress = await requestIp.getClientIp(contextRequest);
      // Check x-forwarded-for header.
      // This will return multiple values, need to get the first one.
      // Ex: '100.38.252.210, 10.255.0.25, 10.0.0.59,::ffff:10.0.0.187,::ffff:10.0.0.168'
      if (contextRequest.headers['x-forwarded-for']) {
        const addresses = contextRequest.headers['x-forwarded-for'].split(',');
        ipAddress = addresses[0];
      }
      // Use the Imperva IP if headers are present.
      if (contextRequest.headers['incap-client-ip']) {
        ipAddress = contextRequest.headers['incap-client-ip'];
      }
      // Use test_ip value if it's set as a query param for debug mode.
      if (args.ip) {
        ipAddress = args.ip;
      }

      const response = await dataSources.drupalApi.getIpAccessCheck(ipAddress);

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
          uuid: ONLINE_RESOURCES_ALL_RESEARCH_UUID,
          name: 'All Research Libraries',
          mapping_uuid: 'all-research-libs-mapping-id'
        })
      }

      return {
        items: matches,
        pageInfo: {
          clientIp: ipAddress
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