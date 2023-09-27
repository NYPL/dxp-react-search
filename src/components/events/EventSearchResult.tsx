import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// Components
import {
  Box,
  Button,
  CardHeading,
  Pagination,
  StatusBadge,
  Text,
} from "@nypl/design-system-react-components";
import CardGrid from "../shared/CardGrid";
import Card from "../shared/CardGrid/Card";
import Image from "../shared/Image";
// Type
import { EventItem } from "./EventCollection";

export const EVENT_COLLECTION_SEARCH_QUERY = gql`
  query EventCollectionSearchQuery(
    $limit: Int
    $pageNumber: Int
    $filter: EventFilter
  ) {
    eventCollectionSearch(
      limit: $limit
      pageNumber: $pageNumber
      filter: $filter
    ) {
      items {
        id
        title
        eventTypes {
          id
          name
        }
        description
        location
        date
        time
        experience
        image {
          id
          uri
        }
        eventSeries {
          id
          name
        }
        eventTopics {
          id
          name
        }
        eventAudience {
          id
          name
        }
        tags
        localistEventUrl
        ticketPrice
        needsRegistration
        slug
      }
      pageInfo {
        limit
        pageCount
      }
    }
  }
`;

export const getFiltersFromQueryParams = (queryParams: Record<string, any>) => {
  let queryFilters = {};
  if (queryParams["location"]) {
    queryFilters = {
      ...queryFilters,
      location: {
        fieldName: "venue_id",
        operator: "=",
        value: String(queryParams.location).split(" "),
      },
    };
  }

  if (queryParams["event_types"]) {
    queryFilters = {
      ...queryFilters,
      event_type: {
        fieldName: "type",
        operator: "=",
        value: String(queryParams.event_types).split(" "),
      },
    };
  }

  if (queryParams["event_series"]) {
    queryFilters = {
      ...queryFilters,
      event_series: {
        fieldName: "type",
        operator: "=",
        value: String(queryParams.event_series).split(" "),
      },
    };
  }

  if (queryParams["event_audience"]) {
    queryFilters = {
      ...queryFilters,
      event_audience: {
        fieldName: "type",
        operator: "=",
        value: String(queryParams.event_audience).split(" "),
      },
    };
  }

  if (queryParams["event_topics"]) {
    queryFilters = {
      ...queryFilters,
      event_topics: {
        fieldName: "type",
        operator: "=",
        value: String(queryParams.event_topics).split(" "),
      },
    };
  }

  return queryFilters;
};

interface EventSearchResultsProps {
  id: string;
  limit: number;
}

export default function EventSearchResult({
  id,
  limit,
}: EventSearchResultsProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;

  function onPageChange(pageIndex: number) {
    router.push({ query: { page: pageIndex } });
  }

  const queryFilters = {
    ...getFiltersFromQueryParams(router.query),
    q: router.query.q,
  };

  const { data, loading, error } = useQuery(EVENT_COLLECTION_SEARCH_QUERY, {
    variables: {
      filter: queryFilters,
      limit: limit,
      pageNumber: currentPage ? currentPage : 1,
    },
  });

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const showClearSearchTerms = [
    "location",
    "event_type",
    "event_series",
    "q",
  ].some((item) => router.query.hasOwnProperty(item));

  return (
    <Box id={id}>
      {showClearSearchTerms && (
        <Box mb="l">
          {data.eventCollectionSearch.items.length === 0 && (
            <div>No results.</div>
          )}
          <Button
            id="event-search-clear-all"
            buttonType="link"
            onClick={() => {
              router.replace("/events/calendar", undefined, {
                shallow: true,
              });
            }}
          >
            Clear all search terms.
          </Button>
        </Box>
      )}
      <CardGrid id="event-search-results" type="event" layout="row">
        {data.eventCollectionSearch.items.map(
          (item: EventItem, i: number): React.ReactNode => (
            <Box
              as="li"
              key={`item-container-${item.id}-${i}`}
              listStyleType="none"
            >
              <Card
                id={item.id}
                href={item.localistEventUrl}
                layout="row"
                image={
                  <Image
                    id={item.image.id}
                    alt="alt text"
                    uri={item.image.uri}
                    useTransformation={false}
                    transformationLabel={"2_1_960"}
                    layout="responsive"
                    width={900}
                    height={450}
                    quality={90}
                  />
                }
                // description={item.description}
                cardContent={
                  <>
                    <Box display="block" pb="s" as="b">
                      <Text size="overline1" mb="xxs">
                        {item.eventAudience?.name || ""}
                      </Text>
                      <CardHeading
                        level="three"
                        text={item.title}
                        url={item.localistEventUrl}
                      />
                      <Box>
                        {item.date} @ {item.time}
                      </Box>
                      <Box>{item.location}</Box>
                    </Box>
                    <Box display="flex">
                      {item.eventTypes && (
                        <Box mb="s">
                          {item.eventTypes.map(
                            (type: Record<string, string | number>) => (
                              <StatusBadge
                                key={`${type.name}-key`}
                                display="inline-block"
                                marginInlineEnd={"s"}
                              >
                                {type.name}
                              </StatusBadge>
                            )
                          )}
                        </Box>
                      )}
                      {item.eventSeries && (
                        <Box mb="s">
                          {item.eventSeries.map(
                            (type: Record<string, string | number>) => (
                              <StatusBadge
                                key={`${type.name}-key`}
                                display="inline-block"
                                marginInlineEnd={"s"}
                              >
                                {type.name}
                              </StatusBadge>
                            )
                          )}
                        </Box>
                      )}{" "}
                      {item.eventTopics && (
                        <Box mb="s">
                          {item.eventTopics.map(
                            (type: Record<string, string | number>) => (
                              <StatusBadge
                                key={`${type.name}-key`}
                                display="inline-block"
                                marginInlineEnd={"s"}
                              >
                                {type.name}
                              </StatusBadge>
                            )
                          )}
                        </Box>
                      )}
                    </Box>
                  </>
                }
              />
            </Box>
          )
        )}
      </CardGrid>
      <Box
        sx={{
          // Centers the pagination component.
          "& nav[role=navigation]": {
            justifyContent: "center",
          },
        }}
        data-testid="event-pagination"
      >
        <Pagination
          initialPage={currentPage}
          pageCount={data.eventCollectionSearch.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}
