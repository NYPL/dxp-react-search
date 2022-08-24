import React from "react";
// Apollo
import withApollo from "./../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
import { FILTERS_QUERY } from "./../../components/shared/FilterBar/MultiSelect";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import BlogCollection, {
  BLOGS_QUERY,
} from "../../components/blogs/BlogCollection/BlogCollection";
// Content
import blogsContent from "../../__content/blogs";

function BlogsAllPage() {
  const { meta } = blogsContent;

  return (
    <PageContainer
      metaTags={{
        // @TODO This should be something else?
        title: meta.title,
        description: meta.description,
      }}
      breadcrumbs={[
        {
          text: "All",
          url: "",
        },
      ]}
      showContentHeader={true}
      showFilterBar={true}
      contentPrimary={
        <BlogCollection
          id="all-blogs"
          limit={10}
          sort={{ field: "created", direction: "DESC" }}
          status={true}
        />
      }
    />
  );
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BLOGS_QUERY,
    variables: {
      limit: 10,
      pageNumber: 1,
      sort: { field: "created", direction: "DESC" },
      filter: { status: { fieldName: "status", operator: "=", value: true } },
    },
  });

  // Channels filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "channel",
      type: "taxonomy",
      limit: 200,
      pageNumber: 1,
      sort: {
        field: "name",
        direction: "ASC",
      },
      includeChildren: true,
      customData: false,
    },
  });

  // Subjects filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "subject",
      type: "taxonomy",
      limit: 200,
      pageNumber: 1,
      filter: {
        limiter: {
          fieldName: "field_lts_content_type",
          operator: "=",
          value: "blog",
        },
      },
      sort: {
        field: "name",
        direction: "ASC",
      },
      includeChildren: true,
      customData: false,
    },
  });

  // Libraries filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "library",
      type: "content",
      limit: 200,
      pageNumber: 1,
      sort: {
        field: "title",
        direction: "ASC",
      },
      includeChildren: false,
      customData: false,
    },
  });

  // Divisions filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "division",
      type: "content",
      limit: 200,
      pageNumber: 1,
      sort: {
        field: "title",
        direction: "ASC",
      },
      includeChildren: false,
      customData: false,
    },
  });

  // Audience filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "audience_by_age",
      type: "taxonomy",
      limit: 200,
      pageNumber: 1,
      sort: {
        field: "name",
        direction: "ASC",
      },
      includeChildren: false,
      customData: false,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default withApollo(BlogsAllPage);
