import requestIp from "request-ip";

const ipAccessCheckResolver = {
  Query: {
    allLocationMatches: async (parent, args, { dataSources }) => {
      const clientIp = await requestIp.getClientIp(dataSources.drupalApi.context.req);
      const response = await dataSources.drupalApi.getIpAccessCheck(args, clientIp);

      return {
        items: response,
        pageInfo: {
          clientIp: clientIp
        }
      }
    }
  },
  LocationMatch: {
    id: locationMatch => {
      return locationMatch.uuid;
    },
    name: locationMatch => {
      return locationMatch.name;
    }
  }
}

export default ipAccessCheckResolver;