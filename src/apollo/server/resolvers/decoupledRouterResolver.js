const { DRUPAL_API } = process.env;

const decoupledRouterResolver = {
  Query: {
    decoupledRouter: async (parent, args, { dataSources }) => {
      try {
        const response = await dataSources.drupalApi.getDecoupledRouter(args);
        return response;
      } catch (error) {
        let httpStatus;

        if (
          // 404 will be returned by Drupal if there's no matching route.
          error.extensions.response.status === 404 ||
          // 403 will be returned if the route matches, but is unpublished.
          error.extensions.response.status === 403
        ) {
          httpStatus = "NOT_FOUND";
        }

        if (error.extensions.response.status === 500) {
          httpStatus = "ERROR";
        }

        if (error.extensions.response.status === 503) {
          httpStatus = "SERVICE_UNAVAILABLE";
        }

        return {
          id: `router-id-${args.path}__${httpStatus.toLowerCase()}`,
          uuid: null,
          redirect: null,
          responseInfo: {
            httpStatus: httpStatus,
            httpStatusCode: error.extensions.response.status,
            apiPath: `${DRUPAL_API}/router/translate-path?path=${args.path}`,
          },
        };
      }
    },
  },
  DecoupledRouter: {
    id: (parent, args, context, info) => {
      if (parent.hasOwnProperty("jsonapi")) {
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
      } else {
        return parent.id;
      }
    },
    uuid: (router) => {
      return router.entity?.uuid ? router.entity.uuid : null;
    },
    redirect: (router) => {
      if (Array.isArray(router.redirect)) {
        return router.redirect[0];
      }
    },
    responseInfo: (parent, args, context, info) => {
      if (parent.hasOwnProperty("jsonapi")) {
        const path = info.variableValues.path;
        return {
          httpStatus: "SUCCESS",
          httpStatusCode: 200,
          apiPath: `${DRUPAL_API}/router/translate-path?path=${path}`,
        };
      } else {
        return parent.responseInfo;
      }
    },
  },
};

export default decoupledRouterResolver;
