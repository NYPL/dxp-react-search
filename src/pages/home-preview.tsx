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
import {
  queryFilters as homePageHeroCollectionQueryFilters,
  HOME_PAGE_HERO_COLLECTION_QUERY,
} from "./../components/home-v1/Hero/HeroWithData";
import {
  queryFilters as homePageSpotlightCollectionQueryFilters,
  HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY,
} from "./../components/home-v1/Spotlight/Spotlight";
import {
  queryFilters as homePageEventCollectionQueryFilters,
  HOME_PAGE_EVENT_COLLECTION_QUERY,
} from "./../components/home-v1/EventCollection/EventCollection";
// Hooks
import useDecoupledRouter, {
  DECOUPLED_ROUTER_QUERY,
} from "./../hooks/useDecoupledRouter";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

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
  // Page is for content only, not public, so if preview and time machine mode
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
        filter: homePageHeroCollectionQueryFilters(
          context.query.publish_on as string
        ),
      }),
    },
  });

  await apolloClient.query({
    query: HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY,
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: homePageSpotlightCollectionQueryFilters(
          context.query.publish_on as string
        ),
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
        filter: homePageEventCollectionQueryFilters(
          context.query.publish_on as string
        ),
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
