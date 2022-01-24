import React from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import BlogsContainer from "../../components/blogs/BlogsContainer";

function BlogsAllPage() {
  return (
    <PageContainer
      showContentHeader={true}
      showFilterBar={true}
      contentPrimary={<BlogsContainer id="featured-posts" limit={10} />}
    />
  );
}

export default withApollo(BlogsAllPage, {
  ssr: true,
  redirects: false,
});
