import React, { Fragment, useEffect } from 'react';
// Next
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../apollo/client/withApollo';
import { useQuery } from '@apollo/client';
import { 
  DecoupledRouterQuery as DECOUPLED_ROUTER_QUERY 
} from './../../../apollo/client/queries/DecoupledRouter.gql';
import {
  OnlineResourceByIdQuery as ONLINE_RESOURCE_BY_ID_QUERY
} from './../../../apollo/client/queries/OnlineResourceById.gql';
// Redux
import { withRedux } from './../../../redux/withRedux';
// Components
import { SkeletonLoader } from '@nypl/design-system-react-components';
import PageContainer from './../../../components/shared/layouts/PageContainer';
import RightRail from './../../../components/shared/RightRail';
import SearchHeader from './../../../components/shared/SearchHeader';
import SearchForm from './../../../components/online-resources/SearchForm';
import OnlineResourceCard from './../../../components/online-resources/OnlineResourceCard';
import SidebarMenus from './../../../components/online-resources/SidebarMenus';

function OnlineResourceSlug() {
  const router = useRouter();
  const { slug } = router.query;

  // Run decoupled router query to get uuid.
  const { data: decoupledRouterData } = useQuery(
    DECOUPLED_ROUTER_QUERY, {
      variables: {
        path: `/research/online-resources/${slug}`
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
        wrapperClass='nypl--research'
        contentHeader={
          <SearchHeader>
            <SearchForm />
          </SearchHeader>
        }
        contentPrimary={
          <SkeletonLoader />
        }
        contentBottom={
          <RightRail />
        }
      />
    );
  }

  return (
    <PageContainer
      metaTags={{
        title: `${data.searchDocument.name}`,
        description: `${data.searchDocument.name}`,
        url: `https://www.nypl.org/research/online-resources/${slug}`
      }}
      wrapperClass='nypl--research'
      contentHeader={
        <SearchHeader>
          <SearchForm />
        </SearchHeader>
      }
      contentPrimary={
        <Fragment>
          <Link href="/research/online-resources">
            <a><h3>Online Resources</h3></a>
          </Link>
          <OnlineResourceCard item={data.searchDocument} />
        </Fragment>
      }
      showSidebar={true}
      sidebarSide='right'
      contentSecondary={
        <SidebarMenus />
      }
      contentBottom={
        <RightRail />
      }
    />
  );
}

export default withApollo(
  withRedux((OnlineResourceSlug)), { 
    ssr: true, 
    redirects: true 
  });