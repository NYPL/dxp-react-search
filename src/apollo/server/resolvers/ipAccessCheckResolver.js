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
      // args.ip will be from query param for testing, otherwise use
      // the actual client ip from the request headers.
      /*console.log(dataSources.drupalApi.context.req.headers)

      let clientIp;
      if (args.ip) {
        clientIp = args.ip;
      } else {
        clientIp = await requestIp.getClientIp(dataSources.drupalApi.context.req);
      }

      const response = await dataSources.drupalApi.getIpAccessCheck(clientIp);
      */

      const contextRequest = dataSources.drupalApi.context.req;
      let ipAddress = await requestIp.getClientIp(contextRequest);
      console.log(ipAddress)

      // Check x-forwarded-for
      // This will return multiple values, need to get the first one.
      // Ex: '100.38.252.210, 10.255.0.25, 10.0.0.59,::ffff:10.0.0.187,::ffff:10.0.0.168'
      if (contextRequest.headers['x-forwarded-for']) {
        const addresses = contextRequest.headers['x-forwarded-for'].split(',');
        ipAddress = addresses[0];
      }

      // Use the Imperva IP
      if (contextRequest.headers['incap-client-ip']) {
        ipAddress = contextRequest.headers['incap-client-ip'];
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