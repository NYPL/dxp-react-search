import React, { Fragment } from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../redux/withRedux";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import ChannelsCards from "./../../components/blogs/ChannelsCards";
import BlogCards from "../../components/blogs/BlogCards";
import BookList from "../../components/blogs/BookList";
import SubjectsCards from "../../components/blogs/SubjectsCards";

function BlogsMainPage() {
  return (
    <PageContainer
      showContentHeader={true}
      contentPrimary={
        <>
          <BlogCards
            title={"Featured Posts"}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur."
            slug="/blogs/all"
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
            limit={6}
            sortBy="weight"
            featured={true}
          />
          <SubjectsCards />
        </>
      }
    />
  );
}

export default withApollo(withRedux(BlogsMainPage), {
  ssr: true,
  redirects: false,
});
