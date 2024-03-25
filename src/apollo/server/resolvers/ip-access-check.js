// Utils
import {
  ONLINE_RESOURCES_ALL_BRANCH_UUID,
  ONLINE_RESOURCES_ALL_RESEARCH_UUID,
  ONLINE_RESOURCES_OFFSITE_UUID,
  ONLINE_RESOURCES_ONSITE_UUID,
} from "../../../utils/config";
import getRequestIp from "../../../utils/getRequestIp";

export const ipAccessCheckResolver = {
  Query: {
    allLocationMatches: async (parent, args, { dataSources }) => {
      const clientIp = getRequestIp(dataSources.drupalApi.context.req, args.ip);
      const response = await dataSources.drupalApi.getIpAccessCheck(clientIp);

      // Manipulate data from api.
      let itemsArray = [];
      let matches = [];
      // Create an array of objects.
      for (let [key, locationItem] of Object.entries(response.locations)) {
        itemsArray.push(locationItem);
      }
      // Check for matches.
      itemsArray.map((item) => {
        if (item.match) {
          matches.push(item);
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
          name: "Generic On Site",
          mapping_uuid: "generic-onsite-mapping-id",
        });
      }
      if (response.isBranch) {
        matches.push({
          uuid: ONLINE_RESOURCES_ALL_BRANCH_UUID,
          name: "All Branch Libraries",
          mapping_uuid: "all-branch-libs-mapping-id",
        });
      }
      if (response.isResearch) {
        matches.push({
          uuid: ONLINE_RESOURCES_ALL_RESEARCH_UUID,
          name: "All Research Libraries",
          mapping_uuid: "all-research-libs-mapping-id",
        });
      }

      return {
        items: matches,
        pageInfo: {
          clientIp: clientIp,
        },
      };
    },
  },
  LocationMatch: {
    id: (locationMatch) => locationMatch.mapping_uuid,
    name: (locationMatch) => locationMatch.name,
    locationId: (locationMatch) => locationMatch.uuid,
  },
};
