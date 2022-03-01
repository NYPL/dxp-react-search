import React from "react";
// Apollo
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import ChannelsCards from "../../components/blogs/ChannelsCards/ChannelsCards";
// Content
import blogsContent from "../../__content/blogs";
// Utils
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import { BLOGS_BASE_PATH } from "./../../utils/config";

function BlogsChannelsPage() {
  const { explore_by_channel } = blogsContent;

  return (
    <PageContainer
      metaTags={{
        title: `Blogs: ${explore_by_channel.heading}`,
        description: explore_by_channel.description,
      }}
      breadcrumbs={[
        {
          text: "Blogs",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${BLOGS_BASE_PATH}`,
        },
      ]}
      showContentHeader={true}
      contentPrimary={
        <ChannelsCards
          id="explore-by-channel"
          title={explore_by_channel.heading}
          description={explore_by_channel.description}
          // @ts-ignore
          slug={null}
          limit={30}
          sort={{ field: "weight", direction: "ASC" }}
        />
      }
    />
  );
}

export default withApollo(BlogsChannelsPage, {
  ssr: true,
  redirects: false,
});
