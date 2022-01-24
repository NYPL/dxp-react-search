import React from "react";
// Apollo
import { withApollo } from "../../apollo/client/withApollo";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import ChannelsCards from "../../components/blogs/ChannelsCards";
import BlogsContainer from "../../components/blogs/BlogsContainer";
import SubjectCards from "../../components/blogs/SubjectCards";
// Content
import blogsContent from "../../__content/blogs";

function BlogsMainPage() {
  const { meta, featured_posts, explore_by_channel } = blogsContent;
  return (
    <PageContainer
      showContentHeader={true}
      contentPrimary={
        <>
          <BlogsContainer
            id="featured-posts"
            title={featured_posts.heading}
            description={featured_posts.description}
            slug={featured_posts.slug}
            slugLabel={featured_posts.slugLabel}
            limit={6}
            featured={true}
            sortBy={"created"}
          />
          <ChannelsCards
            id="explore-by-channel"
            title={explore_by_channel.heading}
            description={explore_by_channel.description}
            slug={explore_by_channel.slug}
            slugLabel={explore_by_channel.slugLabel}
            limit={6}
            sortBy="weight"
            featured={true}
          />
          {/*<SubjectCards />*/}
        </>
      }
    />
  );
}

export default withApollo(BlogsMainPage, {
  ssr: true,
  redirects: false,
});