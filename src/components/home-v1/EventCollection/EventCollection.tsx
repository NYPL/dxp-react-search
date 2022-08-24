import * as React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Component
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
} from "@chakra-ui/react";
import ComponentWrapper, {
  SeeMore,
} from "../ComponentWrapper/ComponentWrapper";
import EventCollectionTabPanelContent from "./EventCollectionTabPanelContent";
import EventCard, { EventCardProps as EventItem } from "./EventCard";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

const EVENT_COLLECTION_QUERY = gql`
  query ($filter: QueryFilter, $preview: Boolean, $sort: Sort, $limit: Int) {
    homePageEventCollection(
      filter: $filter
      sort: $sort
      preview: $preview
      limit: $limit
    ) {
      items {
        id
        title
        image {
          id
          uri
          transformations {
            id
            uri
            label
          }
        }
        published
        link
        category
        location
        displayDate
        publishOn
        unpublishOn
        weight
      }
    }
  }
`;

interface EventCollectionProps {
  title: string;
  link: string;
  seeMore: SeeMore;
}

type eventsGroupedByCategoryType = { [key: string]: EventItem[] };

export default function EventCollection({
  title,
  link,
  seeMore,
}: EventCollectionProps) {
  const router = useRouter();

  // Preview mode.
  // @TODO Setup isPreview to work for both time machine and regular non-time machine previews.
  const isPreview =
    router.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    router.query.uuid
      ? true
      : false;

  const isTimeMachine = isPreview && router.query.publish_on ? true : false;

  let queryFilters;
  if (isTimeMachine) {
    queryFilters = {
      experimental: true,
      conjunction: "OR",
      groups: [
        {
          conjunction: "AND",
          conditions: [
            {
              field: "status",
              operator: "=",
              value: "true",
            },
            {
              field: "publish_on",
              operator: "IS NULL",
            },
            {
              field: "unpublish_on",
              operator: "IS NULL",
            },
          ],
        },
        {
          conjunction: "AND",
          conditions: [
            {
              field: "publish_on",
              operator: "<=",
              value: router.query.publish_on,
            },
            {
              field: "unpublish_on",
              operator: ">=",
              value: router.query.publish_on,
            },
          ],
        },
      ],
    };
  }

  const { loading, error, data } = useQuery(EVENT_COLLECTION_QUERY, {
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: queryFilters,
      }),
      sort: {
        field: "field_lts_event_category",
        direction: "ASC",
      },
      limit: 30,
    },
  });

  if (error) {
    return <div>Error while loading homepage events.</div>;
  }

  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  const eventsGroupedByCategory: eventsGroupedByCategoryType =
    data.homePageEventCollection.items.reduce(
      (accumulator: eventsGroupedByCategoryType, item: EventItem) => {
        (accumulator[item.category] = accumulator[item.category] || []).push(
          item
        );
        return accumulator;
      },
      {}
    );

  const eventsCategories = Object.keys(eventsGroupedByCategory);

  const setCategoryTitle = (category: string) => {
    switch (category) {
      case "kids_teens":
        return "Kids & Teens";
      case "author_talks":
        return "Author Talks & Conversations";
      default:
        return category;
    }
  };

  return (
    <ComponentWrapper
      title={title}
      link={link}
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
      alignSectionHeading="46px"
      hoverStyle={true}
      seeMore={seeMore}
    >
      <Box>
        {/* Mobile */}
        <Box as="ul" display={{ base: "block", md: "none" }}>
          {eventsCategories.map((eventCategory) => {
            let featuredEvent: EventItem | undefined;
            if (eventsGroupedByCategory[eventCategory]) {
              // Get the first event to be featured on mobile
              eventsGroupedByCategory[eventCategory].forEach((event) => {
                if (event.weight === 0) {
                  featuredEvent = event;
                }
              });
            }
            if (featuredEvent) {
              return (
                <Box as="li" mb={8}>
                  <Heading
                    as="h3"
                    fontFamily="Kievit-Medium"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="red.200"
                    my={2.5}
                  >
                    {setCategoryTitle(eventCategory)}
                  </Heading>
                  <EventCard
                    {...featuredEvent}
                    variant="event-card"
                    size="lg"
                  />
                </Box>
              );
            }
          })}
        </Box>

        {/* Desktop */}
        <Tabs
          display={{ base: "none", md: "block" }}
          align="end"
          variant="enclosed"
          mr={{ md: 1, lg: 0 }}
          borderColor="red.200"
        >
          <TabList borderBottomWidth="2px">
            {eventsCategories &&
              eventsCategories.map((eventsCategory) => (
                <Tab
                  flex={{ base: 1, lg: "unset" }}
                  py={2.5}
                  px={5}
                  w={{ lg: "15.5%", xl: "12%" }}
                  textTransform="uppercase"
                  fontSize="xs"
                  lineHeight="none"
                  _selected={{
                    color: "red.200",
                    borderRadius: "none",
                    border: "2px solid ",
                    borderBottomColor: "brand.100",
                    mb: "-0.5",
                  }}
                >
                  {setCategoryTitle(eventsCategory)}
                </Tab>
              ))}
          </TabList>
          <TabPanels>
            {eventsCategories.map((eventCategory) => {
              return (
                <TabPanel px={0} tabIndex={-1} key={eventCategory}>
                  <EventCollectionTabPanelContent
                    id={`event-tab-panel-${eventCategory}`}
                    events={eventsGroupedByCategory[eventCategory]}
                  />
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </ComponentWrapper>
  );
}
