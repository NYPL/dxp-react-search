import React from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Components
import PageContainer from "./../../components/events/layouts/PageContainer";
import EventCollection from "../../components/events/EventCollection/EventCollection";
// import BlogCollection from "../../components/blogs/BlogCollection";
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
