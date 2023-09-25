import React from "react";
import { GetServerSideProps } from "next";
// Apollo
import withApollo from "../../apollo/withApollo";
import { initializeApollo } from "../../apollo/withApollo/apollo";
// Components
import { Box } from "@nypl/design-system-react-components";
import PageContainer from "../../components/events/layout/PageContainer";
import EventSearchResult, {
  EVENT_COLLECTION_SEARCH_QUERY,
} from "../../components/events/EventSearchResult";
// import { FILTERS_QUERY } from "../../components/events";
// Content
import eventContent from "../../__content/event";

function EventsMainPage() {
  const { meta } = eventContent;

  return (
    <PageContainer
      metaTags={meta}
      contentPrimary={
        <Box>
          <EventSearchResult id="localist-events" limit={12} />
        </Box>
      }
    />
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: EVENT_COLLECTION_SEARCH_QUERY,
    variables: {
      limit: 12,
      pageNumber: 1,
      filter: {},
    },
  });

  // Filters.
  // await apolloClient.query({
  //   query: FILTERS_QUERY,
  //   variables: {
  //     limit: 200,
  //     pageNumber: 1,
  //   },
  // });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default withApollo(EventsMainPage);
