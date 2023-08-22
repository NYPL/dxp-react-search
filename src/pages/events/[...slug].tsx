import React from "react";
// Apollo
import withApollo from "../../apollo/withApollo";
import { initializeApollo } from "../../apollo/withApollo/apollo";

import { useQuery } from "@apollo/client";
// Next
import Error from "../_error";
import { GetServerSideProps } from "next";
// Component
import { EventDetails, EVENT_QUERY } from "../../components/events";
import { Box } from "@nypl/design-system-react-components";
import PageContainer from "../../components/shared/layouts/PageContainer";

function EventDetailPage(props: any) {
  const { id } = props;
  const { loading, error, data } = useQuery(EVENT_QUERY, {
    variables: { id: id },
  });

  if (!data || error) {
    return <Error statusCode={404} />;
  }

  if (loading || !data) {
    return <div>locading</div>;
  }

  return (
    <PageContainer
      breadcrumbs={[
        { text: "Home", url: "/" },
        {
          text: "Events Calendar",
          url: "/events/calendar",
        },
        {
          text: data.event.title,
          url: "",
        },
      ]}
      wrapperClass="nypl--event"
      contentPrimary={
        <Box>
          <EventDetails {...data.event} />
        </Box>
      }
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: EVENT_QUERY,
    variables: { id: context.query.id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: context.query.id,
    },
  };
};

export default withApollo(EventDetailPage);
