import * as React from "react";
// Apollo
import withApollo from "./../../../../apollo/withApollo";
import { initializeApollo } from "./../../../../apollo/withApollo/apollo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
// Redux
import { withRedux } from "../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import SearchResults, {
  SEARCH_RESULTS_QUERY,
} from "../../../../components/online-resources/SearchResults/SearchResults";
import { FILTERS_QUERY } from "./../../../../components/shared/FilterBar/MultiSelect";
// Utils
import onlineResourcesContent from "./../../../../__content/onlineResources";

// queryOnlineResourcesFilter
export async function queryOnlineResourceFilters(
  apolloClient: ApolloClient<NormalizedCacheObject>
) {
  // Subjects filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "subject",
      type: "taxonomy",
      limit: 200,
      pageNumber: 1,
      filter: {
        limiter: {
          fieldName: "field_lts_content_type",
          operator: "=",
          value: "online_resource",
        },
      },
      sort: {
        field: "name",
        direction: "ASC",
      },
      includeChildren: true,
      customData: false,
    },
  });

  // Audience filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "audience_by_age",
      type: "taxonomy",
      limit: 200,
      pageNumber: 1,
      sort: {
        field: "name",
        direction: "ASC",
      },
      includeChildren: false,
      customData: false,
    },
  });

  // Availability filters.
  await apolloClient.query({
    query: FILTERS_QUERY,
    variables: {
      id: "availability",
      type: "taxonomy",
      limit: 200,
      pageNumber: 1,
      sort: {
        field: "name",
        direction: "ASC",
      },
      includeChildren: false,
      customData: true,
    },
  });
}

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

  await queryOnlineResourceFilters(apolloClient);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

// @ts-ignore
export default withApollo(withRedux(OnlineResourcesSearchPage));
