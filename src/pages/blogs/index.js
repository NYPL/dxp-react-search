import React, { Fragment } from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../redux/withRedux";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import ChannelsCards from "./../../components/blogs/ChannelsCards";
import FeaturedPosts from "../../components/blogs/FeaturedPosts";

function BlogsMainPage() {
  return (
    <PageContainer
      showContentHeader={true}
      contentPrimary={
        <>
          <FeaturedPosts />
          <ChannelsCards />
        </>
      }
    />
  );
}

export default withApollo(withRedux(BlogsMainPage), {
  ssr: true,
  redirects: false,
});
