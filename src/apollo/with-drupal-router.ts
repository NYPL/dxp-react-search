import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "./withApollo/apollo";
import { DECOUPLED_ROUTER_QUERY } from "./../hooks/useDecoupledRouter";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export type WithDrupalRouterReturnProps = {
  /** The uuid of the Drupal entity. */
  uuid: string;
  /** The revision id of the Drupal entity. */
  revisionId: string;
  /** The slug of the Drupal entity. */
  slug?: string;
  /** Whether or not preview mode is activated. */
  isPreview: boolean;
  /** The ApolloClient instance defined inside the with-drupal-router function. */
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type WithDrupalRouterOptions = {
  /** The NextJS data fetching function type. */
  method: "SSG" | "SSR";
  /** Whether the preview mode is custom version or using NextJS preview mode. */
  customPreview: boolean;
};

type NextContext = GetServerSidePropsContext | GetStaticPropsContext;

export default function withDrupalRouter<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: NextContext,
    props: WithDrupalRouterReturnProps
  ) => Promise<GetServerSidePropsResult<P>> | Promise<GetStaticPropsResult<P>>,
  options: WithDrupalRouterOptions
) {
  return async function handlerWrapperWithDrupalRouter(context: NextContext) {
    const apolloClient = initializeApollo();

    let uuid;
    let revisionId = null;
    let slug;
    let isPreview = false;

    if (options.method === "SSG") {
      slug = Array.isArray(context.params?.slug)
        ? context.params?.slug[0]
        : context.params?.slug;
      const { previewData }: any = context as GetStaticPropsContext;

      // Preview mode.
      isPreview = context.preview ? context.preview : false;

      // Set the uuid for preview mode.
      if (isPreview) {
        uuid = previewData.uuid;
        revisionId = previewData.revisionId;
      }
    }

    if (options.method === "SSR") {
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

      // Handle the redirect if it exists.
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

    // Return handlers based on type of function passed.
    if (options.method === "SSG") {
      return handler(context, {
        uuid,
        revisionId,
        slug,
        isPreview,
        apolloClient,
      }) as Promise<GetStaticPropsResult<P>>;
    }

    if (options.method === "SSR") {
      return handler(context, {
        uuid,
        revisionId,
        slug,
        isPreview,
        apolloClient,
      }) as Promise<GetServerSidePropsResult<P>>;
    }
  };
}