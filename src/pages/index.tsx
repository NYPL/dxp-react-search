import * as React from "react";
// Next
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
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

function HomePagePage() {
  const router = useRouter();
  const nextRouter = router;
  nextRouter.asPath = "/home";
  const { uuid } = useDecoupledRouter(nextRouter);

  return <HomePage uuid={uuid} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const slug = "/home";
  // Get decoupled router data.
  const decoupledRouterData = await apolloClient.query({
    query: DECOUPLED_ROUTER_QUERY,
    variables: {
      path: slug,
      isPreview: false,
    },
  });

  const uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;

  await apolloClient.query({
    query: HOME_PAGE_QUERY,
    variables: {
      id: uuid,
    },
  });

  await apolloClient.query({
    query: HOME_PAGE_HERO_COLLECTION_QUERY,
    variables: {
      filter: {
        experimental: true,
        conditions: [
          {
            operator: "=",
            field: "status",
            value: "true",
          },
        ],
      },
    },
  });

  await apolloClient.query({
    query: HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY,
    variables: {
      filter: {
        experimental: true,
        conditions: [
          {
            operator: "=",
            field: "status",
            value: "true",
          },
        ],
      },
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
      filter: {
        experimental: true,
        conditions: [
          {
            operator: "=",
            field: "status",
            value: "true",
          },
        ],
      },
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
    // Page will revalidate every min. So every minute the first user to view pg
    // will get an SSR version, all requests after will get SSG.
    // revalidate: 60,
    // Turn off request based revalidation.
    revalidate: false,
  };
};

export default withApollo(HomePagePage);
