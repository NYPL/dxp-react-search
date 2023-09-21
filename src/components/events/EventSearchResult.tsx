import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// Components
import {
  Box,
  Pagination,
  StatusBadge,
} from "@nypl/design-system-react-components";
import CardGrid from "../shared/CardGrid";
import Card from "../shared/CardGrid/Card";
import Image from "../shared/Image";
// Type
import { EventItem } from "./EventCollection";

export const EVENT_SEARCH_QUERY = gql`
  query EventSearchQuery($limit: Int, $pageNumber: Int, $filter: EventFilter) {
    eventSearch(limit: $limit, pageNumber: $pageNumber, filter: $filter) {
      items {
        id
        title
        eventTypes {
          id
          name
        }
        eventSeries {
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

  if (queryParams["event_type"]) {
    queryFilters = {
      ...queryFilters,
      event_type: {
        fieldName: "type",
        operator: "=",
        value: String(queryParams.event_type).split(" "),
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

  const { data, loading, error } = useQuery(EVENT_SEARCH_QUERY, {
    variables: {
      filter: queryFilters,
      limit: limit,
      pageNumber: currentPage ? currentPage : 1,
    },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Box id={id}>
      <CardGrid id="event-search-results" type="event">
        {data.eventSearch.items.map(
          (item: EventItem, i: number): React.ReactNode => (
            <Box
              as="li"
              key={`item-container-${item.id}-${i}`}
              listStyleType="none"
              gridColumn="auto / span 4"
            >
              <Card
                id={item.id}
                heading={item.title}
                href={item.localistEventUrl}
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
                      <Box>
                        {item.date} @ {item.time}
                      </Box>
                      <Box>{item.location}</Box>
                    </Box>
                    {item.tags && (
                      <Box mb="s">
                        {item.tags.map((tag: string) => (
                          <StatusBadge
                            key={`${tag}-key`}
                            display="inline-block"
                            marginInlineEnd={"s"}
                          >
                            {tag}
                          </StatusBadge>
                        ))}
                      </Box>
                    )}
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
          pageCount={data.eventSearch.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}
