import React from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Components
import {
  Box,
  Heading,
  HeadingLevels,
  Hero,
  HeroTypes,
} from "@nypl/design-system-react-components";
import PageContainer from "./../../components/events/layouts/PageContainer";
import EventCollection from "../../components/events/EventCollection";
import EventCollectionFilters from "./../../components/events/EventCollection/EventCollectionFilters";
// // Content
// import blogsContent from "../../__content/blogs";

function EventsAllPage() {
  return (
    <PageContainer
      metaTags={{
        // @TODO This should be something else?
        title: "Events All",
        description: "Events All Description",
      }}
      breadcrumbs={[
        {
          text: "All",
        },
      ]}
      showContentHeader={true}
      showFilterBar={true}
      contentHeader={
        <>
          <Hero
            heroType={HeroTypes.Tertiary}
            heading={<Heading level={HeadingLevels.One} text="Events" />}
            subHeaderText="The Library is here to help you learn and connect with your community through our wide array of free events, programs, classes, book clubs, and more. Please check listings to confirm if a program is in-person, online, or outdoors."
            backgroundColor="#E0E0E0"
            foregroundColor="#000000"
          />
          <Box maxWidth="1280px" padding="1rem 1rem" margin="0 auto">
            <EventCollectionFilters />
          </Box>
        </>
      }
      contentPrimary={
        <EventCollection
          id="event-collection-all"
          limit={10}
          sort={{ field: "eventStart", direction: "descending" }}
          //status={true}
        />
      }
    />
  );
}

export default withApollo(EventsAllPage, {
  ssr: true,
  redirects: false,
});
