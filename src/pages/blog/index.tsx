import React from "react";
import { GetStaticProps } from "next";
// Apollo
import withApollo from "./../../apollo/withApollo";
import { initializeApollo } from "./../../apollo/withApollo/apollo";
// Components
import PageContainer from "../../components/blogs/layouts/PageContainer";
import ChannelsCards, {
  CHANNELS_QUERY,
} from "../../components/blogs/ChannelsCards/ChannelsCards";
import BlogCollection, {
  BLOGS_QUERY,
} from "../../components/blogs/BlogCollection/BlogCollection";
// Content
import blogsContent from "../../__content/blogs";

function BlogsMainPage() {
  const { meta, featured_posts, explore_by_channel } = blogsContent;

  return (
    <PageContainer
      metaTags={{
        title: meta.title,
        description: meta.description,
      }}
      showContentHeader={true}
      contentPrimary={
        <>
          <BlogCollection
            id="featured-posts"
            title={featured_posts.heading}
            description={featured_posts.description}
            slug={featured_posts.slug}
            slugLabel={featured_posts.slugLabel}
            limit={6}
            featured={true}
            sort={{ field: "created", direction: "DESC" }}
            status={true}
          />
          <ChannelsCards
            id="explore-by-channel"
            title={explore_by_channel.heading}
            description={explore_by_channel.description}
            slug={explore_by_channel.slug}
            slugLabel={explore_by_channel.slugLabel}
            limit={6}
            sort={{ field: "weight", direction: "ASC" }}
            featured={true}
          />
        </>
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BLOGS_QUERY,
    variables: {
      sort: { field: "created", direction: "DESC" },
      limit: 6,
      pageNumber: 1,
      filter: {
        featured: {
          fieldName: "field_bs_featured",
          operator: "=",
          value: true,
        },
        status: { fieldName: "status", operator: "=", value: true },
      },
    },
  });

  await apolloClient.query({
    query: CHANNELS_QUERY,
    variables: {
      vocabulary: "channel",
      sort: { field: "weight", direction: "ASC" },
      limit: 6,
      filter: {
        featured: {
          fieldName: "field_bs_featured",
          operator: "=",
          value: true,
        },
      },
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    // 10 mins.
    revalidate: 600,
  };
};

export default withApollo(BlogsMainPage);
