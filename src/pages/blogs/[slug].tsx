import React from "react";
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import BlogPost from "../../components/blogs/BlogPost";

function BlogPostPage() {
  return (
    <PageContainer showContentHeader={false} contentPrimary={<BlogPost />} />
  );
}

export default withApollo(BlogPostPage, {
  ssr: true,
  redirects: true,
});
