import React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "./../../../../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../../components/online-resources/layouts/PageContainer";
import SearchResults from "./../../../../../components/online-resources/SearchResults";
import {
  SearchResultsSkeletonLoader,
  SearchResultsDetailsSkeletonLoader,
} from "./../../../../../components/online-resources/SearchResults/SearchResultsSkeletonLoader";
import Error from "./../../../../_error";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../../../utils/config";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import onlineResourcesContent from "./../../../../../__content/onlineResources";
// Hooks
import useDecoupledRouter from "../../../../../hooks/useDecoupledRouter";

const RESOURCE_TOPIC_BY_ID_QUERY = gql`
  query TermByIdQuery($id: String, $vocabulary: String) {
    term(id: $id, vocabulary: $vocabulary) {
      id
      tid
      title
      description
      slug
      image {
        uri
      }
    }
  }
`;

function FeaturedResourceTopicSlug() {
  const router = useRouter();
  const { slug } = router.query;
  const { uuid } = useDecoupledRouter(router);

  // Get resource topic by id.
  const { loading, error, data } = useQuery(RESOURCE_TOPIC_BY_ID_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      vocabulary: "resource_topic",
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading Online Resource.</div>;
  }

  // If uuid returns null from useDecoupledRouter, there was no router
  // path match in Drupal, so we return 404 status error component.
  if (!data && uuid === null) {
    return <Error statusCode={404} />;
  }

  // Loading state.
  if (loading || !data) {
    return (
      <PageContainer
        breadcrumbs={[
          {
            text: onlineResourcesContent.title,
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
          },
        ]}
        showContentHeader={true}
        contentPrimary={
          <>
            <SearchResultsDetailsSkeletonLoader />
            <SearchResultsSkeletonLoader />
          </>
        }
      />
    );
  }

  const resourceTopic = data.term;

  return (
    <PageContainer
      metaTags={{
        title: `${resourceTopic.title}`,
        description: resourceTopic.description,
        imageUrl: resourceTopic.image.uri,
      }}
      breadcrumbs={[
        {
          text: resourceTopic.title,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${resourceTopic.slug}`,
        },
      ]}
      showContentHeader={true}
      contentPrimary={
        <SearchResults
          resourceTopicId={resourceTopic.tid}
          resourceTopicTitle={resourceTopic.title}
        />
      }
    />
  );
}

export default withApollo(withRedux(FeaturedResourceTopicSlug), {
  ssr: true,
  redirects: true,
});
