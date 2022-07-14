import React from "react";
// Apollo
import withApollo from "./../../../../apollo/withApollo";
import { initializeApollo } from "./../../../../apollo/withApollo/apollo";
// Redux
import { withRedux } from "../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import SearchResults, {
  SEARCH_RESULTS_QUERY,
} from "../../../../components/online-resources/SearchResults/SearchResults";
// Utils
import onlineResourcesContent from "./../../../../__content/onlineResources";

function OnlineResourcesSearchPage() {
  const { title, description } = onlineResourcesContent;

  return (
    <PageContainer
      metaTags={{
        title: `${title} Search`,
        description: description,
      }}
      breadcrumbs={[
        {
          text: "Search",
          url: "",
        },
      ]}
      showContentHeader={true}
      contentPrimary={<SearchResults />}
    />
  );
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SEARCH_RESULTS_QUERY,
    variables: {
      alpha: null,
      audience_by_age: null,
      availability: null,
      limit: 10,
      pageNumber: 1,
      q: "",
      subjects: null,
      tid: null,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

// @ts-ignore
export default withApollo(withRedux(OnlineResourcesSearchPage));
