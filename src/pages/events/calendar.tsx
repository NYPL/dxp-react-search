import React from "react";
// Apollo
import withApollo from "../../apollo/withApollo";
import { initializeApollo } from "../../apollo/withApollo/apollo";
// Component
import { Box, Hero, Heading } from "@nypl/design-system-react-components";
import PageContainer from "../../components/shared/layouts/PageContainer";
import EventCollection, {
  EVENT_COLLECTION_QUERY,
} from "../../components/events/EventCollection";
import eventContent from "../../__content/event";

function EventsMainPage() {
  return (
    <PageContainer
      breadcrumbs={[
        { text: "Home", url: "/" },
        {
          text: "Events Calendar",
          url: "",
        },
      ]}
      wrapperClass="nypl--event"
      contentHeader={
        <Hero
          heroType="tertiary"
          heading={<Heading level="one" text={eventContent.meta.title} />}
          subHeaderText={eventContent.meta.description}
          backgroundColor={"section.whats-on.primary"}
          foregroundColor="ui.white"
        />
      }
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
      limit: 12,
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
