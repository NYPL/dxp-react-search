import { 
  DecoupledRouterQuery as DECOUPLED_ROUTER_QUERY 
} from './queries/DecoupledRouter.gql';

async function decoupledRouterRedirect(ctx) {
  return await ctx.apolloClient
    .query({
      query: DECOUPLED_ROUTER_QUERY,
      variables: {
        path: ctx.asPath
      },
      // @TODO Do we need this?
      // Prevent caching issues when logging in/out without refresh.
      //fetchPolicy: 'network-only',
    })
    .then(({ data }) => {
      // Return false if this is not a redirect.
      if (!data || !data.decoupledRouter.redirect) {
        return false;
      }

      // Handle the redirect.
      const redirect = data.decoupledRouter.redirect;

      if (ctx.res) {
        ctx.res.writeHead(redirect.status, {
          Location: redirect.to,
        });

        console.log(redirect)
        ctx.res.end();
      }
    })
    .catch(() => {
      return false;
    });
}

export default decoupledRouterRedirect;