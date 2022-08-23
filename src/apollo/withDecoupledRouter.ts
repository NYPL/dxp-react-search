import { GetServerSidePropsContext } from "next";
import { initializeApollo } from "./withApollo/apollo";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export default function withDecoupledRouter(gssp: any) {
  return async (context: GetServerSidePropsContext) => {
    const apolloClient = initializeApollo();

    let uuid;

    // Preview mode.
    const isPreview =
      context.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
      context.query.uuid
        ? true
        : false;
    // Set the uuid for preview mode.
    if (isPreview) {
      uuid = context.query.uuid;
    } else {
      // Get the slug from the context, i.e., "/blog/whatever-title".
      const slug = context.resolvedUrl;
      // Get decoupled router data.
      const decoupledRouterData = await apolloClient.query({
        query: DECOUPLED_ROUTER_QUERY,
        variables: {
          path: slug,
        },
      });

      uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
      const redirect = await decoupledRouterData?.data?.decoupledRouter
        ?.redirect;

      // Redirect logic.
      // Route is not found in CMS, so set 404 status.
      if (uuid === null && !redirect) {
        return {
          notFound: true,
        };
      }

      // Handle the redirect.
      if (redirect) {
        return {
          redirect: {
            statusCode: 301,
            destination: redirect.to,
          },
          props: {},
        };
      }
    }
    return await gssp(context);
  };
}
