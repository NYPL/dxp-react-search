import React from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import BlogsContainer from "../../components/blogs/BlogsContainer";
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
        },
      ]}
      showContentHeader={true}
      showFilterBar={true}
      contentPrimary={
        <BlogsContainer
          id="all-blogs"
          limit={10}
          sort={{ field: "created", direction: "DESC" }}
          status={true}
        />
      }
    />
  );
}

export default withApollo(BlogsAllPage, {
  ssr: true,
  redirects: false,
});
