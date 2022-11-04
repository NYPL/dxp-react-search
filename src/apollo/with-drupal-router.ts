import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { GetServerSideProps, GetStaticProps } from "next";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "./withApollo/apollo";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export type WithDrupalRouterReturnProps = {
  uuid: string;
  revisionId: string;
  slug: string;
  isPreview: boolean;
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type NextDataFetchingFunctionContext =
  | GetServerSidePropsContext
  | GetStaticPropsContext;

export type NextDataFetchingFunction = GetServerSideProps | GetStaticProps;

// @TODO Add typing for nextDataFetchingFunction.
// @see typing for nextDataFetchingFunction? https://github.com/vercel/next.js/discussions/10925#discussioncomment-1031901
// @see https://stackoverflow.com/a/72041520
export default function withDrupalRouter(
  nextDataFetchingFunction: NextDataFetchingFunctionContext
) {
  return async (
    context: NextDataFetchingFunctionContext
  ): Promise<NextDataFetchingFunction | any> => {
    const isGetStaticPropsFunction = context.hasOwnProperty("resolvedUrl")
      ? false
      : true;

    const apolloClient = initializeApollo();

    let uuid;
    let revisionId = null;
    let slug;
    let isPreview;

    // getStaticProps().
    if (isGetStaticPropsFunction) {
      slug = Array.isArray(context.params?.slug)
        ? context.params?.slug[0]
        : context.params?.slug;
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
      const { resolvedUrl, query } = context as GetServerSidePropsContext;

      slug = resolvedUrl;
      // Preview mode.
      isPreview =
        query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET && query.uuid
          ? true
          : false;
      // Set the uuid for preview mode.
      if (isPreview) {
        uuid = query.uuid;
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

      // Handle the redirect.
      const redirect = await decoupledRouterData?.data?.decoupledRouter
        ?.redirect;

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

    // @TODO instead of adding props seperate from context, you could add them into context itself?
    // @see https://stackoverflow.com/a/72035518
    // @ts-ignore
    return await nextDataFetchingFunction(context, {
      uuid,
      revisionId,
      slug,
      isPreview,
      apolloClient,
    });
  };
}
