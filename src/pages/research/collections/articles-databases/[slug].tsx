import * as React from "react";
// Next
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery, useApolloClient } from "@apollo/client";
import withApollo from "./../../../../apollo/withApollo";
import { initializeApollo } from "./../../../../apollo/withApollo/apollo";
import { LOCATION_MATCHES_BY_IP_QUERY } from "./../../../../components/online-resources/SearchResults/SearchResults";
// Redux
import { withRedux } from "./../../../../redux/withRedux";
// Components
import PageContainer from "./../../../../components/online-resources/layouts/PageContainer";
import OnlineResourceCard from "./../../../../components/online-resources/OnlineResourceCard";
import { SearchResultsCardSkeletonLoader } from "../../../../components/online-resources/SearchResults/SearchResultsSkeletonLoader";
import Error from "./../../../_error";
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from "./../../../../utils/config";
import onlineResourcesContent from "./../../../../__content/onlineResources";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;
// Hooks
import useDecoupledRouter, {
  DECOUPLED_ROUTER_QUERY,
} from "./../../../../hooks/useDecoupledRouter";

export const ONLINE_RESOURCE_BY_ID_QUERY = gql`
  query OnlineResourceByIdQuery($id: String) {
    searchDocument(id: $id) {
      ... on OnlineResourceDocument {
        id
        slug
        name
        description
        accessibilityLink
        termsConditionsLink
        privacyPolicyLink
        subjects {
          id
          name
        }
        accessLocations {
          id
          name
          url
        }
        accessibleFrom
        resourceUrl
        notes
        language
        availabilityStatus
      }
    }
  }
`;

function OnlineResourceSlug() {
  const router = useRouter();

  // Apollo.
  const client = useApolloClient();
  // Local state.
  const [ipInfo, setIpInfo] = React.useState();
  const [clientIpAddress, setClientIpAddress] = React.useState();
  // Run a client query after page renders to ensure that the ip address
  // checking is not ssr, but from the client.
  React.useEffect(() => {
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
          console.error(error);
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

  // If uuid returns null from useDecoupledRouter, there was no router
  // path match in Drupal, so we return 404 status error component.
  if (!data && uuid === null) {
    return <Error statusCode={404} />;
  }

  // Error state.
  if (error) {
    return <div>Error while loading Online Resource.</div>;
  }

  // Loading state.
  if (loading || !data) {
    return (
      <PageContainer
        breadcrumbs={[
          {
            text: onlineResourcesContent.title,
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}/${ONLINE_RESOURCES_BASE_PATH}`,
          },
        ]}
        showContentHeader={true}
        contentPrimary={<SearchResultsCardSkeletonLoader />}
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
          text: `${data.searchDocument.name}`,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${data.searchDocument.slug}`,
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
          <OnlineResourceCard
            collapsible={null}
            item={data.searchDocument}
            ipInfo={ipInfo}
          />
        </>
      }
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  let uuid;

  // Preview mode.
  const isPreview =
    context.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    context.query.uuid
      ? true
      : false;
  // Set the uuid for preview mode.
  if (isPreview) {
    uuid = context.query.uuid;
  } else {
    // Get the slug from the context, i.e., "/blog/whatever-title".
    const slug = context.resolvedUrl;
    // Get decoupled router data.
    const decoupledRouterData = await apolloClient.query({
      query: DECOUPLED_ROUTER_QUERY,
      variables: {
        path: slug,
      },
    });

    uuid = await decoupledRouterData?.data?.decoupledRouter?.uuid;
    const redirect = await decoupledRouterData?.data?.decoupledRouter?.redirect;

    // Redirect logic.
    // Route is not found in CMS, so set 404 status.
    if (uuid === null && !redirect) {
      return {
        notFound: true,
      };
    }

    // Handle the redirect.
    if (redirect) {
      return {
        redirect: {
          statusCode: 301,
          destination: redirect.to,
        },
        props: {},
      };
    }
  }

  await apolloClient.query({
    query: ONLINE_RESOURCE_BY_ID_QUERY,
    variables: {
      id: uuid,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

// @ts-ignore
export default withApollo(withRedux(OnlineResourceSlug));
