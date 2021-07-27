import React, { Fragment, useEffect } from 'react';
// Next
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useQuery } from '@apollo/client';
import { withApollo } from './../../../../apollo/client/withApollo';
import { 
  DecoupledRouterQuery as DECOUPLED_ROUTER_QUERY 
} from './../../../../apollo/client/queries/DecoupledRouter.gql';
import {
  OnlineResourceByIdQuery as ONLINE_RESOURCE_BY_ID_QUERY
} from './../../../../apollo/client/queries/OnlineResourceById.gql';
// Redux
import { withRedux } from './../../../../redux/withRedux';
// Components
//import { SkeletonLoader } from '@nypl/design-system-react-components';
import PageContainer from './../../../../components/online-resources/layouts/PageContainer';
import OnlineResourceCard from './../../../../components/online-resources/OnlineResourceCard';
import SearchResultsSkeleton from './../../../../components/online-resources/SearchResults/SearchResultsSkeleton';


// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../../utils/config';
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function OnlineResourceSlug() {
  const router = useRouter();
  const { slug } = router.query;

  // Run decoupled router query to get uuid.
  const { data: decoupledRouterData } = useQuery(
    DECOUPLED_ROUTER_QUERY, {
      variables: {
        path: router.asPath
      }
    }
  );
  
  const uuid = decoupledRouterData?.decoupledRouter?.id;

  // Query for data.
  const { loading, error, data } = useQuery(
    ONLINE_RESOURCE_BY_ID_QUERY, {
      skip: !uuid,
      variables: {
        id: uuid
      }
    }
  );

  // Error state.
  if (error) {
    return (
      <div>Error while loading Online Resource.</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <PageContainer
        breadcrumbs={[
          {
            text: 'Online Resources',
            url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research/collections/online-resources`
          }
        ]}
        contentPrimary={
          <SearchResultsSkeleton />
        }
      />
    );
  }

  return (
    <PageContainer
      metaTags={{
        title: `${data.searchDocument.name}`,
        description: `${data.searchDocument.name}`,
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}/${slug}`
      }}
      breadcrumbs={[
        {
          text: 'Online Resources',
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research/collections/online-resources`
        }
      ]}
      showContentHeader={true}
      contentPrimary={
        <Fragment>
          <OnlineResourceCard item={data.searchDocument} />
        </Fragment>
      }
    />
  );
}

export default withApollo(
  withRedux((OnlineResourceSlug)), { 
    ssr: true, 
    redirects: true 
  });