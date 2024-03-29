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
  revisionId?: string;
  /** The slug of the Drupal entity. */
  slug: string | undefined;
  /** If true, preview mode is activated. */
  isPreview: boolean;
  /** The bundle of the entity. */
  bundle?: string;
  /** The ApolloClient instance defined inside the with-drupal-router function. */
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export type WithDrupalRouterOptions = {
  /** If true, sets the preview mode to custom, otherwise defaults to use NextJS preview mode. */
  customPreview?: boolean;
};

type NextContext = GetServerSidePropsContext | GetStaticPropsContext;

export type WithDrupalRouterNextPreviewData = {
  uuid: string;
  revisionId: string;
};

/*
 * Higher order function to use with getStaticProps or getServerSideProps to connect to Drupal's routing system.
 */
export default function withDrupalRouter<
  P extends { [key: string]: any } = { [key: string]: any }
>(
  handler: (
    context: NextContext,
    props: WithDrupalRouterReturnProps
  ) => Promise<GetServerSidePropsResult<P>> | Promise<GetStaticPropsResult<P>>,
  options?: WithDrupalRouterOptions
) {
  return async function handlerWrappedWithDrupalRouter(context: NextContext) {
    // Only getServerSideProps will have `res` and `req` properties in the context object.
    const isGetStaticPropsFunction =
      !context.hasOwnProperty("res") && !context.hasOwnProperty("req");

    const apolloClient = initializeApollo();

    let uuid;
    let revisionId;
    let slug;
    let isPreview = false;

    // Handle different types of preview mode.
    const isNextPreview = !options?.customPreview;

    if (isGetStaticPropsFunction) {
      // If catch all pattern is used for filename, i.e., [...slug].tsx, the slug value will be an array.
      // Examples: ["research"] or ["research", "support"]
      // So we convert the array into a url slug path, i.e., /research/support
      if (Array.isArray(context.params?.slug)) {
        slug = `/${context.params?.slug.join("/")}`;
      } else {
        // Non catch all pattern, i.e. [slug].tsx will not return an array, but just a string.
        slug = `/${context.params?.slug}`;
      }

      const { previewData, preview } = context as GetStaticPropsContext;

      // Preview mode. If getStaticProps, only NextJS preview mode works.
      isPreview = preview ? preview : false;

      // Set the uuid for preview mode.
      if (isPreview) {
        const nextPreviewData = previewData as WithDrupalRouterNextPreviewData;

        uuid = nextPreviewData.uuid;
        revisionId = nextPreviewData.revisionId;
      }
    } else {
      // getServerSideProps().
      const { previewData, resolvedUrl, query } =
        context as GetServerSidePropsContext;

      slug = resolvedUrl;

      // Preview modes.
      if (isNextPreview) {
        // NextJS preview mode.
        isPreview = context.preview ? context.preview : false;

        // Set the uuid for preview mode.
        if (isPreview) {
          const nextPreviewData =
            previewData as WithDrupalRouterNextPreviewData;

          uuid = nextPreviewData.uuid;
          revisionId = nextPreviewData.revisionId;
        }
      } else {
        // Custom preview mode.
        isPreview =
          query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
          query.uuid &&
          query.revision_id
            ? true
            : false;
        // Set the uuid and revisionId for preview mode.
        if (isPreview) {
          uuid = query.uuid as string;
          revisionId = query.revision_id as string;
        }
      }
    }

    // Shared code.
    // Get decoupled router data.
    const decoupledRouterData = await apolloClient.query({
      query: DECOUPLED_ROUTER_QUERY,
      variables: {
        path: slug,
        isPreview: isPreview,
      },
    });

    // Set the UUID for published pages
    if (!isPreview) {
      uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
    }

    const bundle = await decoupledRouterData?.data?.decoupledRouter?.bundle;

    // Handle the redirect if it exists.
    const redirect = await decoupledRouterData?.data?.decoupledRouter?.redirect;

    if (redirect) {
      return {
        redirect: {
          statusCode: 301,
          destination: redirect.to,
        },
        props: {},
      };
    }

    const returnProps: WithDrupalRouterReturnProps = {
      uuid,
      revisionId,
      slug,
      isPreview,
      bundle,
      apolloClient,
    };

    // Return handlers based on type of function passed.
    if (isGetStaticPropsFunction) {
      return handler(context, returnProps) as Promise<GetStaticPropsResult<P>>;
    } else {
      return handler(context, returnProps) as Promise<
        GetServerSidePropsResult<P>
      >;
    }
  };
}
