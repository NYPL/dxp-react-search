import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { EVENT_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/eventFields";
// Components
import {
  Box,
  Grid,
  Heading,
  HeadingLevels,
  Image,
  ImageRatios,
  Pagination,
} from "@nypl/design-system-react-components";
import NextDsLink from "../../shared/Link/NextDsLink";
// Next
import { useRouter } from "next/router";
// Utils
import formatDate from "../../../utils/formatDate";

export const EVENT_COLLECTION_QUERY = gql`
  ${EVENT_FIELDS_FRAGMENT}
  query EventCollectionQuery(
    $pageNumber: Int
    $limit: Int
    $sort: Sort
    $filter: EventFilter
  ) {
    eventCollection(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $filter
    ) {
      items {
        ...EventFields
      }
      pageInfo {
        limit
        totalItems
        pageCount
      }
    }
  }
`;

interface EventCollectionProps {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  slugLabel?: string;
  limit?: number;
  pageNumber?: number;
  sort?: any;
  featured?: boolean;
  status?: boolean;
}

function EventCollection({ id, limit, sort }: EventCollectionProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;

  const { loading, error, data } = useQuery(EVENT_COLLECTION_QUERY, {
    variables: {
      limit: limit ? limit : null,
      pageNumber: currentPage ? currentPage : 1,
      sort: sort ? sort : null,
      // @TODO Add check for router.query for any query params and only add this property?
      filter: {
        ...(router.query.audience && {
          audiences: (router.query.audience as string).split(" "),
        }),
        ...(router.query["event-type"] && {
          eventTypes: (router.query["event-type"] as string).split(" "),
        }),
      },
    },
  });

  function onPageChange(pageIndex: number) {
    router.push({
      query: {
        page: pageIndex,
      },
    });
  }

  if (error) {
    return <div>Error while loading events.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Grid
        as="ul"
        gap="l"
        templateColumns="repeat(1, 1fr)"
        listStyleType="none"
        data-testid="event-collection"
      >
        {data.eventCollection.items.map((item: any) => (
          <li key={item.id}>
            <Box id={id} display={{ lg: "flex" }}>
              {item.featuredImage && (
                <Box
                  flex={{ lg: "0 0 360px" }}
                  mr={{ lg: "m" }}
                  mb={{ base: "s", lg: 0 }}
                >
                  <Image
                    alt="Alt text"
                    imageAspectRatio={ImageRatios.TwoByOne}
                    src={item.featuredImage}
                  />
                </Box>
              )}
              <Box flexFlow={{ lg: "row nowrap" }}>
                <Heading level={HeadingLevels.Three}>
                  {item.id && (
                    <NextDsLink href={`/events/${item.id}`}>
                      {item.title}
                    </NextDsLink>
                  )}
                </Heading>
                <Box fontWeight="bold">
                  {formatDate(item.startDate, "MMMM D, YYYY | h:mmA")}
                </Box>
                <Box fontWeight="bold">{item.locationName}</Box>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: item.shortDescription,
                  }}
                />
              </Box>
            </Box>
          </li>
        ))}
      </Grid>
      <Box
        sx={{
          // Centers the pagination component.
          "& nav[role=navigation]": {
            justifyContent: "center",
          },
        }}
        data-testid="event-collection-pagination"
      >
        <Pagination
          initialPage={currentPage}
          pageCount={data.eventCollection.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
}

export default EventCollection;
