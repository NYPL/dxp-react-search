import React from "react";
// Apollo
import withApollo from "../../apollo/withApollo";
import { initializeApollo } from "../../apollo/withApollo/apollo";
// Component
import { Box } from "@nypl/design-system-react-components";
import PageContainer from "../../components/shared/layouts/PageContainer";
import EventCollection, {
  EVENT_COLLECTION_QUERY,
} from "../../components/events/EventCollection";

function EventsMainPage() {
  return (
    <PageContainer
      breadcrumbs={[
        { text: "Home", url: "/" },
        {
          text: "All Events",
          url: "",
        },
      ]}
      wrapperClass="nypl--event"
      contentPrimary={
        <Box>
          <EventCollection id="all-events" />
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
      limit: 10,
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
