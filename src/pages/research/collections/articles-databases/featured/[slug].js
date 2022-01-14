import React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { useQuery } from "@apollo/client";
import { withApollo } from "./../../../../../apollo/client/withApollo";
import { TermByIdQuery as RESOURCE_TOPIC_BY_ID_QUERY } from "./../../../../../apollo/client/queries/TermById.gql";
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
// Hooks
import useDecoupledRouterQuery from "../../../../../hooks/useDecoupledRouterQuery";

function FeaturedResourceTopicSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: decoupledRouterData } = useDecoupledRouterQuery(router.asPath);
  const uuid = decoupledRouterData?.decoupledRouter?.uuid;

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

  const resourceTopic = data.term;

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
