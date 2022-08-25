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
// Content
import blogsContent from "../../__content/blogs";

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
          text: explore_by_channel.heading,
          url: "",
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

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CHANNELS_QUERY,
    variables: {
      vocabulary: "channel",
      sort: { field: "weight", direction: "ASC" },
      limit: 30,
      featured: false,
      filter: {},
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

export default withApollo(BlogsChannelsPage);
