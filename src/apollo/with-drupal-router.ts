// import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
// import { GetServerSideProps, GetStaticProps } from "next";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "./withApollo/apollo";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export type WithDrupalRouterReturnProps = {
  uuid: string;
  revisionId: string;
  slug: string;
  isPreview: boolean;
  status: string;
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

// @TODO Add typing for nextDataFetchingFunction.
// @see typing for nextDataFetchingFunction? https://github.com/vercel/next.js/discussions/10925#discussioncomment-1031901
// @see https://stackoverflow.com/a/72041520
export default function withDrupalRouter(nextDataFetchingFunction: any) {
  // return async (context: GetServerSidePropsContext | GetStaticPropsContext) => {
  return async (context: any) => {
    const apolloClient = initializeApollo();
    // Only getStaticProps will have the params property.
    const isGetStaticPropsFunction = context.hasOwnProperty("params");

    let uuid;
    let revisionId = null;
    let slug;
    let isPreview;
    let status;

    // getStaticProps().
    if (isGetStaticPropsFunction) {
      slug = Array.isArray(context.params?.slug)
        ? context.params?.slug[0]
        : context.params.slug;
      const { previewData }: any = context;

      // Preview mode.
      isPreview = context.preview ? context.preview : false;

      // Set the uuid for preview mode.
      if (isPreview) {
        uuid = previewData.uuid;
        revisionId = previewData.revisionId;
      }
    } else {
      // getServerSideProps().
      // Preview mode.
      isPreview =
        context.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
        context.query.uuid
          ? true
          : false;
      // Set the uuid for preview mode.
      if (isPreview) {
        uuid = context.query.uuid;
      }
    }

    // Shared code.
    // Not preview mode, so run the rest of the routing logic.
    if (!isPreview) {
      // Get decoupled router data.
      const decoupledRouterData = await apolloClient.query({
        query: DECOUPLED_ROUTER_QUERY,
        variables: {
          path: slug,
        },
      });

      uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
      status = await decoupledRouterData?.data?.decoupledRouter?.status;

      // CMS is in maintenance mode, so throw an error to prevent revalidation.
      // This will allow the old page to continue to render, even if CMS is offline.
      if (status === "SERVICE_UNAVAILABLE") {
        throw new Error(
          "CMS is in maintenance mode. Skipping static revalidation."
        );
      }

      // Error
      if (status === "ERROR") {
        throw new Error("CMS returned an error. Skipping static revalidation.");
      }

      // Route is not found in CMS, so set 404 status.
      if (status === "NOT_FOUND") {
        return {
          notFound: true,
        };
      }

      // Handle the redirect.
      const redirect = await decoupledRouterData?.data?.decoupledRouter
        ?.redirect;
      if (status === "SUCCESS" && redirect) {
        return {
          redirect: {
            statusCode: 301,
            destination: redirect.to,
          },
          props: {},
        };
      }
    }

    // @TODO instead of adding props seperate from context, you could add them into context itself?
    // @see https://stackoverflow.com/a/72035518
    return await nextDataFetchingFunction(context, {
      uuid,
      revisionId,
      slug,
      isPreview,
      status,
      apolloClient,
    });
  };
}
