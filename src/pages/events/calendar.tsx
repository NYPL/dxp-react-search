import React from "react";
// Apollo
import withApollo from "../../apollo/withApollo";
import { initializeApollo } from "../../apollo/withApollo/apollo";
// Component
import { Box } from "@nypl/design-system-react-components";
import PageContainer from "../../components/events/layout/PageContainer";
import EventCollection, {
  EVENT_COLLECTION_QUERY,
} from "../../components/events/EventCollection";
import { FILTERS_QUERY } from "../../components/events";

function EventsMainPage() {
  return (
    <PageContainer
      contentPrimary={
        <Box>
          <EventCollection id="localist-events" />
        </Box>
      }
    />
  );
}
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: EVENT_COLLECTION_QUERY,
    variables: {
      limit: 12,
      pageNumber: 1,
    },
  });

  // Filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      limit: 200,
      pageNumber: 1,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 120,
  };
}
export default withApollo(EventsMainPage);
