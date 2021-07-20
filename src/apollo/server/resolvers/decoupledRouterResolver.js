const decoupledRouterResolver = {
  Query: {
    decoupledRouter: async (parent, args, { dataSources }) => {
      const response = await dataSources.drupalApi.getDecoupledRouter(args);
      return response;
    },
  },
  DecoupledRouter: {
    id: router => {
      return router.entity.uuid;
    },
    redirect: router => {
      if (Array.isArray(router.redirect)) {
        return router.redirect[0]
      }
    }
  }
}

export default decoupledRouterResolver;