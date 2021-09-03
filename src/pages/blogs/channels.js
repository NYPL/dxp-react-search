import React, { Fragment } from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../redux/withRedux";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import ChannelsCards from "./../../components/blogs/ChannelsCards/ChannelsCards";
function BlogsChannelsPage() {
  return (
    <PageContainer
      metaTags={{
        title: "Blogs: Channels",
        description: "Hello welcome to the NYPL!",
        url: "https://www.nypl.org",
      }}
      showContentHeader={true}
      contentPrimary={
        <ChannelsCards
          id="explore-by-channel"
          title="Explore by Channel"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
  est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
  metus ut volutpat turpis nascetur."
          slug={null}
          limit={30}
          sortBy="weight"
        />
      }
    />
  );
}

export default withApollo(withRedux(BlogsChannelsPage), {
  ssr: true,
  redirects: false,
});
