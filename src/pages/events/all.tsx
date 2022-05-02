import React from "react";
// Apollo
import WithApollo from "../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
// Components
import {
  Box,
  Heading,
  HeadingLevels,
  Hero,
  HeroTypes,
} from "@nypl/design-system-react-components";
import PageContainer from "./../../components/events/layouts/PageContainer";
import EventCollection, {
  EVENT_COLLECTION_QUERY,
} from "../../components/events/EventCollection/EventCollection";
import { EVENT_FILTER_QUERY } from "./../../components/events/EventCollection/EventCollectionFilters";
import EventCollectionSearchForm from "./../../components/events/EventCollection/EventCollectionSearchForm";
// Content
import eventsContent from "../../__content/events";

function EventsAllPage() {
  const { meta } = eventsContent;
  return (
    <PageContainer
      metaTags={{
        title: meta.title,
        description: meta.description,
      }}
      breadcrumbs={[
        {
          text: "All",
        },
      ]}
      showContentHeader={true}
      showFilterBar={true}
      contentHeader={
        <>
          <Hero
            heroType={HeroTypes.Tertiary}
            heading={<Heading level={HeadingLevels.One}>{meta.title}</Heading>}
            subHeaderText={meta.description}
            backgroundColor="#E0E0E0"
            foregroundColor="#000000"
          />
          <Box maxWidth="1280px" padding="1rem 1rem" margin="0 auto">
            <EventCollectionSearchForm />
          </Box>
        </>
      }
      contentPrimary={
        <EventCollection
          id="event-collection-all"
          limit={10}
          sort={{ field: "eventStart", direction: "descending" }}
          //status={true}
        />
      }
    />
  );
}

// We prefetch the gql queries and populate the initial apollo cache.
// Components still have gql queries in them, but will already have data
// on first load, and will req data changes client side, the same as they would using ssr.
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: EVENT_FILTER_QUERY,
  });

  await apolloClient.query({
    query: EVENT_COLLECTION_QUERY,
    variables: {
      limit: 10,
      pageNumber: 1,
      sort: { field: "eventStart", direction: "descending" },
      filter: {},
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 120,
  };
}

export default WithApollo(EventsAllPage, {
  redirects: false,
});
