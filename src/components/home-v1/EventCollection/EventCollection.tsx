import * as React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { homePagePreviewQueryFilters } from "./../../../pages/home-preview";
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

export const HOME_PAGE_EVENT_COLLECTION_QUERY = gql`
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

  const { loading, error, data } = useQuery(HOME_PAGE_EVENT_COLLECTION_QUERY, {
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: homePagePreviewQueryFilters(router.query.publish_on as string),
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

  // Sort events by weight for each category.
  for (let category in eventsGroupedByCategory) {
    eventsGroupedByCategory[category].sort(function (a, b) {
      return a.weight - b.weight;
    });
  }

  const eventsCategories = Object.keys(eventsGroupedByCategory);

  const eventCategoryLabel = (category: string) => {
    switch (category) {
      case "kids_teens":
        return "Kids & Teens";
      case "author_talks":
        return "Author Talks & Conversations";
      case "exhibitions":
        return "Exhibitions";
      case "other":
        return "Other Events";
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
              featuredEvent = eventsGroupedByCategory[eventCategory][0];
            }
            if (featuredEvent) {
              return (
                <Box as="li" mb={8} key={`${eventCategory}-featured-event-key`}>
                  <Heading
                    as="h3"
                    fontFamily="Kievit-Medium"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    color="red.200"
                    my={2.5}
                  >
                    {eventCategoryLabel(eventCategory)}
                  </Heading>
                  <EventCard {...featuredEvent} variant="event-card" />
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
              eventsCategories.map((eventsCategory, i) => (
                <Tab
                  key={`event-category-tab-key-${i}`}
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
                  {eventCategoryLabel(eventsCategory)}
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
