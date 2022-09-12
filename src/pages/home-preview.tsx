import * as React from "react";
// Next
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
// Apollo
import withApollo from "../apollo/withApollo";
import { initializeApollo } from "./../apollo/withApollo/apollo";
// Components + queries
import HomePage, {
  HOME_PAGE_QUERY,
} from "./../components/home-v1/HomePage/HomePage";
import { HOME_PAGE_HERO_COLLECTION_QUERY } from "./../components/home-v1/Hero/HeroWithData";
import { HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY } from "./../components/home-v1/Spotlight/Spotlight";
import { HOME_PAGE_EVENT_COLLECTION_QUERY } from "./../components/home-v1/EventCollection/EventCollection";
// Hooks
import useDecoupledRouter, {
  DECOUPLED_ROUTER_QUERY,
} from "./../hooks/useDecoupledRouter";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

/**
 * Helper to generate the query filter groups for previewing homepage content that uses scheduling.
 *
 * @param publishOn - The date the content is scheduled to be published.
 * @returns The query filter groups.
 *
 */
export function homePagePreviewQueryFilters(publishOn: string) {
  return {
    experimental: true,
    conjunction: "OR",
    groups: [
      {
        conjunction: "AND",
        conditions: [
          {
            field: "status",
            operator: "=",
            value: "true",
          },
          {
            field: "publish_on",
            operator: "IS NULL",
          },
          {
            field: "unpublish_on",
            operator: ">=",
            value: publishOn,
          },
        ],
      },
      {
        conjunction: "AND",
        conditions: [
          {
            field: "publish_on",
            operator: "<=",
            value: publishOn,
          },
          {
            field: "unpublish_on",
            operator: ">=",
            value: publishOn,
          },
        ],
      },
    ],
  };
}

function HomePagePreview() {
  const router = useRouter();
  const nextRouter = router;
  nextRouter.asPath = "/home";
  const { uuid, isPreview } = useDecoupledRouter(nextRouter);

  return <HomePage uuid={uuid} isPreview={isPreview} />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Page is for content admins only, not public, so if preview and time machine mode
  // query params are missing, return 404.
  if (!context.query.preview_secret || !context.query.publish_on) {
    return {
      notFound: true,
    };
  }

  const apolloClient = initializeApollo();

  const slug = "/home";
  // Get decoupled router data.
  const decoupledRouterData = await apolloClient.query({
    query: DECOUPLED_ROUTER_QUERY,
    variables: {
      path: slug,
    },
  });

  const uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
  const isPreview =
    context.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    context.query.uuid
      ? true
      : false;
  const isTimeMachine = isPreview && context.query.publish_on ? true : false;

  await apolloClient.query({
    query: HOME_PAGE_QUERY,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
        revisionId: context.query.revision_id,
      }),
    },
  });

  await apolloClient.query({
    query: HOME_PAGE_HERO_COLLECTION_QUERY,
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: homePagePreviewQueryFilters(context.query.publish_on as string),
      }),
    },
  });

  await apolloClient.query({
    query: HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY,
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: homePagePreviewQueryFilters(context.query.publish_on as string),
      }),
      limit: 16,
      sort: {
        field: "field_is_weight",
        direction: "ASC",
      },
    },
  });

  await apolloClient.query({
    query: HOME_PAGE_EVENT_COLLECTION_QUERY,
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: homePagePreviewQueryFilters(context.query.publish_on as string),
      }),
      sort: {
        field: "field_lts_event_category",
        direction: "ASC",
      },
      limit: 30,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default withApollo(HomePagePreview);
