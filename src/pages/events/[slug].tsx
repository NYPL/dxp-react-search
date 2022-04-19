import React from "react";
// Next
import { useRouter } from "next/router";
import Error from "./../_error";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../apollo/client/withApollo";
import { EVENT_FIELDS_FRAGMENT } from "./../../apollo/client/fragments/eventFields";
// Components
import {
  Box,
  Heading,
  HeadingLevels,
  HStack,
  Link,
} from "@nypl/design-system-react-components";
import PageContainer from "../../components/events/layouts/PageContainer";
// Utils
import formatDate from "../../utils/formatDate";

// /events/6478939
const EVENT_QUERY = gql`
  ${EVENT_FIELDS_FRAGMENT}
  query EventQuery($id: String) {
    event(id: $id) {
      ...EventFields
    }
  }
`;

function EventSlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(EVENT_QUERY, {
    variables: {
      id: slug,
    },
  });

  // Return 404.
  if (!data && slug === null) {
    return <Error statusCode={404} />;
  }

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state.
  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  return (
    <PageContainer
      metaTags={{
        title: data.event.title,
        description: data.event.description,
      }}
      breadcrumbs={[
        {
          text: data.event.title,
        },
      ]}
      showContentHeader={false}
      contentPrimary={
        <>
          <Heading level={HeadingLevels.One}>{data.event.title}</Heading>
          <Box fontWeight="bold">
            {formatDate(data.event.startDate, "MMMM D, YYYY | h:mmA")}
          </Box>
          <Box fontWeight="bold">{data.event.locationName}</Box>
          <Box my="l">
            <Heading level={HeadingLevels.Two}>Event Details</Heading>
            <Box
              dangerouslySetInnerHTML={{
                __html: data.event.description,
              }}
            />
            {data.event.audience && (
              <Box mb="l">
                <Box fontWeight="bold">Audience</Box>
                <HStack wrap="wrap" spacing="0" align="left">
                  {data.event.audience.map((audienceItem: any) => {
                    return (
                      <Box pr="xs">
                        <Link key={audienceItem.id} href={audienceItem.id}>
                          {audienceItem.name}
                        </Link>
                      </Box>
                    );
                  })}
                </HStack>
              </Box>
            )}

            {data.event.eventTypes && (
              <Box mb="l">
                <Box fontWeight="bold">Event Types</Box>
                <HStack wrap="wrap" spacing="0" align="left">
                  {data.event.eventTypes.map((eventType: any) => {
                    return (
                      <Box pr="xs">
                        <Link key={eventType.id} href={eventType.id}>
                          {eventType.name}
                        </Link>
                      </Box>
                    );
                  })}
                </HStack>
              </Box>
            )}
          </Box>
        </>
      }
    />
  );
}

export default withApollo(EventSlugPage, {
  ssr: true,
  redirects: false,
});
