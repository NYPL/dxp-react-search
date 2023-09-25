import React, { ReactElement } from "react";
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import {
  Box,
  Pagination,
  StatusBadge,
} from "@nypl/design-system-react-components";
import CardGridSkeletonLoader from "../shared/Card/CardGridSkeletonLoader";
import CardGrid from "../shared/CardGrid";
import Card from "../shared/CardGrid/Card";
import Image from "../shared/Image";

type EventImageType = {
  id: string;
  uri: string;
};

export type ExperienceType = "inperson" | "hyprid" | "virtual";

export interface EventItem {
  id: string;
  title: string;
  eventTypes: Record<string, string | number>;
  eventSeries: Record<string, string | number>;
  image: EventImageType;
  location: string;
  locationDetail: string;
  address?: string;
  date: string;
  time: string;
  experience: ExperienceType;
  description: string;
  tags: string[];
  localistEventUrl: string;
  ticketPrice: string;
  needsRegistration: boolean;
  slug: string;
}

export const EVENT_COLLECTION_QUERY = gql`
  query EventsQuery($limit: Int, $pageNumber: Int) {
    eventCollection(limit: $limit, pageNumber: $pageNumber) {
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

interface EventCollectionProps {
  id: string;
  limit: number;
}

function EventCollection({ id, limit }: EventCollectionProps): ReactElement {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;
  const { loading, error, data } = useQuery(EVENT_COLLECTION_QUERY, {
    variables: {
      limit: limit,
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
      <CardGridSkeletonLoader
        templateColumns="repeat(3, 1fr)"
        gap="l"
        cardLayout="column"
        showImage={true}
        itemsCount={6}
      />
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
      <CardGrid id={id} type="event">
        {data.eventCollection.items.map(
          (item: EventItem): React.ReactNode => (
            <Box
              as="li"
              key={`item-container-${item.id}`}
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
                description={truncateText(item.description)}
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
          pageCount={data.eventCollection.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
}

export default EventCollection;
