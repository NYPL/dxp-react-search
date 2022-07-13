import React from "react";
import { GetStaticProps } from "next";
// Apollo
import withApollo from "./../../../../apollo/withApollo";
import { initializeApollo } from "./../../../../apollo/withApollo/apollo";
// Redux
import { withRedux } from "./../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import AlphabetNav from "./../../../../components/online-resources/AlphabetNav";
import ResourceTopics, {
  RESOURCE_TOPICS_QUERY,
} from "./../../../../components/online-resources/ResourceTopics/ResourceTopics";
import MostPopularResources, {
  MOST_POPULAR_RESOURCES_QUERY,
} from "./../../../../components/online-resources/MostPopularResources/MostPopularResources";
// Utils
import onlineResourcesContent from "./../../../../__content/onlineResources";

function OnlineResourcesPage() {
  const { title, description } = onlineResourcesContent;

  return (
    <PageContainer
      metaTags={{
        title: title,
        description: description,
      }}
      showContentHeader={true}
      contentPrimary={
        <>
          <ResourceTopics
            id="featured-resources"
            title="Featured Resources"
            limit={30}
            // @ts-ignore
            sort={{ field: "weight", direction: "ASC" }}
          />
          <MostPopularResources id="most-popular" title="Most Popular" />
          <AlphabetNav
            title={"A-Z Articles & Databases"}
            description={
              "Browse resources and databases alphabetically by name"
            }
            className="online-resource-main-alpha-nav"
          />
        </>
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RESOURCE_TOPICS_QUERY,
    variables: {
      filter: {},
      limit: 30,
      sort: { field: "weight", direction: "ASC" },
      vocabulary: "resource_topic",
    },
  });

  await apolloClient.query({
    query: MOST_POPULAR_RESOURCES_QUERY,
    variables: {
      filter: {
        mostPopular: {
          fieldName: "field_is_most_popular",
          operator: "IS NOT NULL",
          value: null,
        },
      },
      limit: 3,
      pageNumber: 1,
      sort: { field: "field_is_most_popular", direction: "ASC" },
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

// @ts-ignore
export default withApollo(withRedux(OnlineResourcesPage));
