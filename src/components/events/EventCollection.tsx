import React, { ReactElement } from "react";
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Next
// import Link from "next/link";
// Components
import {
  Box,
  Grid,
  Pagination,
  Card,
  CardHeading,
  CardContent,
  StatusBadge,
} from "@nypl/design-system-react-components";
import CardGridSkeletonLoader from "../shared/Card/CardGridSkeletonLoader";
import { NextChakraLink } from "../shared/Link/NextChakraLink";

type EventImageType = {
  id: string;
  uri: string;
};

export type ExperienceType = "inperson" | "hyprid" | "virtual";

export interface EventItem {
  id: string;
  title: string;
  eventType: Record<string, string | number>;
  image: EventImageType;
  location: string;
  locationDetail: string;
  date: string;
  time: string;
  experience: ExperienceType;
  description: string;
  tags: string[];
  localistUrl: string;
  ticketPrice: string;
  needsRegistration: boolean;
  slug: string;
}

export const EVENT_COLLECTION_QUERY = gql`
  query EventsQuery($limit: Int, $pageNumber: Int) {
    allEvents(limit: $limit, pageNumber: $pageNumber) {
      items {
        id
        title
        eventType {
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
        localistUrl
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

interface EventCollectionProps {
  id: string;
}

function EventCollection({ id }: EventCollectionProps): ReactElement {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;
  const { loading, error, data } = useQuery(EVENT_COLLECTION_QUERY, {
    variables: {
      limit: 10,
      pageNumber: currentPage ? currentPage : 1,
    },
  });

  function onPageChange(pageIndex: number) {
    router.push({ query: { page: pageIndex } });
  }

  if (error) {
    return <div>Error while loading events.</div>;
  }
  if (loading || !data) {
    return (
      <Grid
        id={id}
        as="ul"
        gap="l"
        templateColumns="repeat(1, 1fr)"
        listStyleType="none"
        data-testid="event-collection"
      >
        <CardGridSkeletonLoader
          templateColumns="repeat(1, 1fr)"
          gap="l"
          cardLayout="row"
          showImage={true}
          itemsCount={5}
        />
      </Grid>
    );
  }

  function truncateText(text: string) {
    if (text.length <= 230) {
      return text;
    }
    const truncatedText = text.slice(0, 200);
    const lastIndex = truncatedText.lastIndexOf(" ");

    return truncatedText.substring(0, lastIndex) + "...";
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
        {data.allEvents.items.map((item: EventItem, i: number) => (
          <li key={`event-item-${item.id}-${i}`}>
            <Card
              imageProps={{
                alt: "Alt text",
                aspectRatio: "twoByOne",
                size: "large",
                src: item.image.uri,
              }}
              layout="row"
            >
              <CardHeading level="three" id="row4-heading1">
                {/* {item.slug ? (
                  <Link
                    href={{
                      pathname: `/events/${item.slug}`,
                      query: { id: item.id },
                    }}
                  >
                    {item.title}
                  </Link>
                ) : ( */}
                <NextChakraLink href={`${item.localistUrl}`} target="_blank">
                  {item.title}
                </NextChakraLink>
                {/* )} */}
              </CardHeading>
              <CardContent>
                <Box display="block" pb="s" as="b">
                  <Box>
                    {item.date} @ {item.time}
                  </Box>
                  <Box>{item.location}</Box>
                </Box>
                <Box mb="s">
                  {item.tags &&
                    item.tags.map((tag: string) => (
                      <StatusBadge
                        key={`${tag}-key`}
                        display="inline-block"
                        marginInlineEnd={"s"}
                      >
                        {tag}
                      </StatusBadge>
                    ))}
                </Box>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: truncateText(item.description),
                  }}
                />
              </CardContent>
            </Card>
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
        data-testid="event-pagination"
      >
        <Pagination
          initialPage={currentPage}
          pageCount={data.allEvents.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
}

export default EventCollection;
