import React, { Fragment } from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../redux/withRedux";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import ChannelsCards from "./../../components/blogs/ChannelsCards";
import BlogsContainer from "../../components/blogs/BlogsContainer";
import SubjectCards from "../../components/blogs/SubjectCards";

function BlogsMainPage() {
  return (
    <PageContainer
      showContentHeader={true}
      contentPrimary={
        <>
          <BlogsContainer
            id="featured-posts"
            title={"Featured Posts"}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur."
            slug="/blogs/all"
            slugLabel="View all blogs"
            limit={6}
            featured={true}
            sortBy={"created"}
          />
          <ChannelsCards
            id="explore-by-channel"
            title="Explore by Channel"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur."
            slug="/blogs/channels"
            slugLabel="View all channels"
            limit={6}
            sortBy="weight"
            featured={true}
          />
          <SubjectCards />
        </>
      }
    />
  );
}

export default withApollo(withRedux(BlogsMainPage), {
  ssr: true,
  redirects: false,
});
