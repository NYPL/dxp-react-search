import React from "react";
// Apollo
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import ChannelsCards from "../../components/blogs/ChannelsCards/ChannelsCards";
// Content
import blogsContent from "../../__content/blogs";

function BlogsChannelsPage() {
  const { explore_by_channel } = blogsContent;

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
          title={explore_by_channel.heading}
          description={explore_by_channel.description}
          // @ts-ignore
          slug={null}
          limit={30}
          sortBy="weight"
        />
      }
    />
  );
}

export default withApollo(BlogsChannelsPage, {
  ssr: true,
  redirects: false,
});
