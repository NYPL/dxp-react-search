import React from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import BlogsContainer from "../../components/blogs/BlogsContainer";
// Content
import blogsContent from "../../__content/blogs";
// Utils
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { BLOGS_BASE_PATH } from "./../../utils/config";

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
          text: "Blogs",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${BLOGS_BASE_PATH}`,
        },
      ]}
      showContentHeader={true}
      showFilterBar={true}
      contentPrimary={
        <BlogsContainer
          id="all-blogs"
          limit={10}
          sort={{ field: "created", direction: "DESC" }}
        />
      }
    />
  );
}

export default withApollo(BlogsAllPage, {
  ssr: true,
  redirects: false,
});
