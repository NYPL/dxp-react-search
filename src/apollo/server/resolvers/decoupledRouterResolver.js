const decoupledRouterResolver = {
  Query: {
    decoupledRouter: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getDecoupledRouter(args);
      return response;
    },
  },
  DecoupledRouter: {
    id: (parent, args, context, info) => {
      //console.log(info.variableValues.path);
      const router = parent;
      // Set a default for id to the path requested in query, since its non nullable.
      let id = info.variableValues.path;
      // Check if entity is returned by router, which would include the uuid.
      if (router.entity) {
        id = `router-id-${router.entity.uuid}`;
      }
      if (!router.entity && router.resolved) {
        id = `router-id-${router.resolved}`;
      }
      return id;
    },
    uuid: (router) => {
      return router.entity?.uuid ? router.entity.uuid : null;
    },
    redirect: (router) => {
      if (Array.isArray(router.redirect)) {
        return router.redirect[0];
      }
    },
  },
};

export default decoupledRouterResolver;
