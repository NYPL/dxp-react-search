import { toApolloError } from "apollo-server-errors";
const { DRUPAL_API } = process.env;

const decoupledRouterResolver = {
  Query: {
    decoupledRouter: async (parent, args, { dataSources }) => {
      try {
        const response = await dataSources.drupalApi.getDecoupledRouter(args);
        return response;
      } catch (error) {
        throw toApolloError(error);
      }
    },
  },
  DecoupledRouter: {
    id: (parent, args, context, info) => {
      const router = parent;
      const queryArgs = info.variableValues;
      // Set a default for id to the path requested in query, since its non nullable.
      let id = queryArgs.path;
      // Check if entity is returned by router, which would include the uuid.
      if (router.entity) {
        id = router.entity.uuid;
      }
      // This is not a drupal route, so return the resolved redirect as id.
      if (!router.entity && router.resolved) {
        id = router.resolved;
      }
      return `router-id-${id}__success`;
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
