import React, { Fragment } from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../redux/withRedux";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import BlogCards from "../../components/blogs/BlogCards";

function BlogsAllPage() {
  return (
    <PageContainer
      showContentHeader={true}
      contentPrimary={<BlogCards id="featured-posts" limit={10} />}
    />
  );
}

export default withApollo(withRedux(BlogsAllPage), {
  ssr: true,
  redirects: false,
});
