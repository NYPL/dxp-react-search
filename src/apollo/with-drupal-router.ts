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
  status: string;
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
    let status;

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
      status = await decoupledRouterData?.data?.decoupledRouter?.status;

      // Static pg only responses.
      if (isGetStaticPropsFunction) {
        // CMS is in maintenance mode, so throw an error to prevent revalidation.
        // This will allow the old page to continue to render, even if CMS is offline.
        if (status === "SERVICE_UNAVAILABLE") {
          throw new Error(
            "CMS is in maintenance mode. Skipping static revalidation."
          );
        }

        // Error
        if (status === "ERROR") {
          throw new Error(
            "CMS returned an error. Skipping static revalidation."
          );
        }
      } else {
        // @TODO figure out how to make this code reuseable?
        if (status !== "SUCCESS") {
          // Set the response code headers.
          (context as GetServerSidePropsContext).res.statusCode = 503;
          // Return the response http status code, which will get picked up by Error pg.
          return {
            props: {
              errorCode: 503,
            },
          };
        }
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
    // @ts-ignore
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
