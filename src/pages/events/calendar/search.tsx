import React from "react";
// Apollo
import withApollo from "../../../apollo/withApollo";
import { initializeApollo } from "../../../apollo/withApollo/apollo";
// Component
import PageContainer from "../../../components/events/layout/PageContainer";
import EventSearchResult, {
  EVENT_SEARCH_QUERY,
} from "../../../components/events/EventSearchResult";
// import { FILTERS_QUERY } from "../../../components/events";
import { getFiltersFromQueryParams } from "../../../components/events/EventSearchResult";
import { GetServerSideProps } from "next";
import eventContent from "../../../__content/event";

function EventsMainPage() {
  const { meta } = eventContent;

  return (
    <PageContainer
      metaTags={meta}
      contentPrimary={
        <EventSearchResult id="event-search-results-container" limit={12} />
      }
    />
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const filter = {
    ...getFiltersFromQueryParams(context.query),
    q: context.query.q,
  };
  // // Filters.
  // await apolloClient.query({
  //   query: FILTERS_QUERY,
  //   variables: {
  //     limit: 200,
  //     pageNumber: 1,
  //   },
  // });
  // Events.
  await apolloClient.query({
    query: EVENT_SEARCH_QUERY,
    variables: {
      filter: filter,
      limit: 12,
      pageNumber: 1,
    },
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
export default withApollo(EventsMainPage);
