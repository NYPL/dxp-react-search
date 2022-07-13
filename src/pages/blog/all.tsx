import React from "react";
// Apollo
import withApollo from "./../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
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

  // @TODO Add Blog filters queries here.

  await apolloClient.query({
    query: BLOGS_QUERY,
    variables: {
      limit: 10,
      pageNumber: 1,
      sort: { field: "created", direction: "DESC" },
      filter: { status: { fieldName: "status", operator: "=", value: true } },
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default withApollo(BlogsAllPage);
