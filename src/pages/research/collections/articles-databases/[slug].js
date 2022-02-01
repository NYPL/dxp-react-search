import React, { useEffect, useState } from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { useQuery, useApolloClient } from "@apollo/client";
import { withApollo } from "./../../../../apollo/client/withApollo";
import { OnlineResourceByIdQuery as ONLINE_RESOURCE_BY_ID_QUERY } from "./../../../../apollo/client/queries/OnlineResourceById.gql";
import { LocationMatchesByIpQuery as LOCATION_MATCHES_BY_IP_QUERY } from "./../../../../apollo/client/queries/LocationMatchesByIp.gql";
// Redux
import { withRedux } from "./../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import OnlineResourceCard from "./../../../../components/online-resources/OnlineResourceCard";
import SearchResultsSkeleton from "./../../../../components/online-resources/SearchResults/SearchResultsSkeleton";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../../utils/config";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
import onlineResourcesContent from "./../../../../__content/onlineResources";
// Hooks
import useDecoupledRouter from "./../../../../hooks/useDecoupledRouter";

function OnlineResourceSlug() {
  const router = useRouter();

  // Apollo.
  const client = useApolloClient();
  // Local state.
  const [ipInfo, setIpInfo] = useState();
  const [clientIpAddress, setClientIpAddress] = useState();
  // Run a client query after page renders to ensure that the ip address
  // checking is not ssr, but from the client.
  useEffect(() => {
    client
      .query({
        query: LOCATION_MATCHES_BY_IP_QUERY,
        variables: {
          ip: router.query.test_ip ? router.query.test_ip : null,
        },
      })
      .then(
        (response) => {
          setIpInfo(response.data ? response.data : null);
          setClientIpAddress(
            response.data?.allLocationMatches?.pageInfo.clientIp
          );
        },
        (error) => {
          //console.error(error);
        }
      );
  }, []);

  const { uuid } = useDecoupledRouter(router);

  // Query for data.
  const { loading, error, data } = useQuery(ONLINE_RESOURCE_BY_ID_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
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
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}/${ONLINE_RESOURCES_BASE_PATH}`,
          },
        ]}
        contentPrimary={<SearchResultsSkeleton />}
      />
    );
  }

  return (
    <PageContainer
      metaTags={{
        title: `${data.searchDocument.name}`,
        description: `${data.searchDocument.description}`,
      }}
      breadcrumbs={[
        {
          text: onlineResourcesContent.title,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`,
        },
      ]}
      showContentHeader={true}
      contentPrimary={
        <>
          {router.query.test_ip && clientIpAddress && (
            <strong>**TEST MODE** Your IP address is: {clientIpAddress}</strong>
          )}
          {router.query.debug && clientIpAddress && (
            <div>
              <h3>IP Address: {clientIpAddress}</h3>
            </div>
          )}
          <OnlineResourceCard item={data.searchDocument} ipInfo={ipInfo} />
        </>
      }
    />
  );
}

export default withApollo(withRedux(OnlineResourceSlug), {
  ssr: true,
  redirects: true,
});
