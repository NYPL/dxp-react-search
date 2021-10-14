import React, { Fragment, useEffect } from "react";
// Next
import Router, { useRouter } from "next/router";
// Apollo
import { getDataFromTree } from "@apollo/client/react/ssr";
import { useQuery } from "@apollo/client";
import { withApollo } from "./../../../../../apollo/client/withApollo";
import { DecoupledRouterQuery as DECOUPLED_ROUTER_QUERY } from "./../../../../../apollo/client/queries/DecoupledRouter.gql";
import { TermBySlugQuery as RESOURCE_TOPIC_BY_SLUG_QUERY } from "./../../../../../apollo/client/queries/TermBySlug.gql";
// Redux
import { withRedux } from "./../../../../../redux/withRedux";
// Components
import { SkeletonLoader } from "@nypl/design-system-react-components";
import PageContainer from "./../../../../../components/online-resources/layouts/PageContainer";
import SearchResults from "./../../../../../components/online-resources/SearchResults";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../../../utils/config";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import onlineResourcesContent from "./../../../../../__content/onlineResources";

function FeaturedResourceTopicSlug() {
  const router = useRouter();
  const { slug } = router.query;

  // Run decoupled router query to get uuid.
  const { data: decoupledRouterData } = useQuery(DECOUPLED_ROUTER_QUERY, {
    variables: {
      path: router.asPath,
    },
  });
  const uuid = decoupledRouterData?.decoupledRouter?.id;

  // Get resource topic by id.
  const { loading, error, data } = useQuery(RESOURCE_TOPIC_BY_SLUG_QUERY, {
    skip: !uuid,
    variables: {
      slug: uuid,
      vocabulary: "resource_topic",
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading Online Resource.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return (
      <PageContainer
        breadcrumbs={[
          {
            text: onlineResourcesContent.title,
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
          },
        ]}
        contentPrimary={<SkeletonLoader />}
      />
    );
  }

  const resourceTopic = data.termBySlug;

  return (
    <PageContainer
      metaTags={{
        title: `${resourceTopic.title}`,
        description: resourceTopic.description,
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}/${slug}`,
        imageUrl: resourceTopic.image.uri,
      }}
      breadcrumbs={[
        {
          text: onlineResourcesContent.title,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
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
