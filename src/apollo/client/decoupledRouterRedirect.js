import { DecoupledRouterQuery as DECOUPLED_ROUTER_QUERY } from "./queries/DecoupledRouter.gql";

async function decoupledRouterRedirect(ctx) {
  return await ctx.apolloClient
    .query({
      query: DECOUPLED_ROUTER_QUERY,
      variables: {
        path: ctx.asPath,
      },
      // @TODO Do we need this?
      // Prevent caching issues when logging in/out without refresh.
      //fetchPolicy: 'network-only',
    })
    .then(({ data }) => {
      // Route is not found in CMS, so set 404 status and return false.
      if (
        data.decoupledRouter.uuid === null &&
        !data.decoupledRouter.redirect
      ) {
        ctx.res.statusCode = 404;
        return false;
      }
      // Route is not a redirect so return false.
      if (!data || !data.decoupledRouter.redirect) {
        return false;
      }
      // Handle the redirect.
      const redirect = data.decoupledRouter.redirect;
      if (ctx.res) {
        ctx.res.writeHead(redirect.status, {
          Location: redirect.to,
        });
        ctx.res.end();
      }
    })
    .catch(() => {
      return false;
    });
}

export default decoupledRouterRedirect;
