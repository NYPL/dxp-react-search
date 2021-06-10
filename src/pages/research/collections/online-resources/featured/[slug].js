import React, { Fragment, useEffect } from 'react';
// Next
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { useQuery } from '@apollo/client';
import { withApollo } from './../../../../../apollo/client/withApollo';
import { 
  DecoupledRouterQuery as DECOUPLED_ROUTER_QUERY 
} from './../../../../../apollo/client/queries/DecoupledRouter.gql';
import {
  ResourceTopicBySlugQuery as RESOURCE_TOPIC_BY_SLUG_QUERY
} from './../../../../../apollo/client/queries/ResourceTopicBySlug.gql';
// Redux
import { withRedux } from './../../../../../redux/withRedux';
// Components
import { SkeletonLoader } from '@nypl/design-system-react-components';
import PageContainer from './../../../../../components/shared/layouts/PageContainer';
import RightRail from './../../../../../components/shared/RightRail';
import SearchHeader from './../../../../../components/shared/SearchHeader';
import SearchForm from './../../../../../components/online-resources/SearchForm';
import SidebarMenus from './../../../../../components/online-resources/SidebarMenus';
import Hero from './../../../../../components/online-resources/Hero';
import SearchResults from './../../../../../components/online-resources/SearchResults';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../../../utils/config';

function FeaturedResourceTopicSlug() {
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
  
  // Get resource topic by id.
  const { loading, error, data } = useQuery(
    RESOURCE_TOPIC_BY_SLUG_QUERY, {
      skip: !uuid,
      variables: {
        slug: uuid
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
          <Fragment>
            <Hero />
            <SearchHeader>
              <SearchForm />
            </SearchHeader>
          </Fragment>
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
        title: `${data.resourceTopic.name}`,
        description: `${data.resourceTopic.name}`,
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}/${slug}`
      }}
      wrapperClass='nypl--research'
      contentHeader={
        <Fragment>
          <Hero />
          <SearchHeader>
            <SearchForm />
          </SearchHeader>
        </Fragment>
      }
      contentPrimary={
        <Fragment>
          <SearchResults
            resourceTopicId={data.resourceTopic.tid}
            resourceTopicTitle={data.resourceTopic.name}
          />
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
  withRedux((FeaturedResourceTopicSlug)), { 
    ssr: true, 
    redirects: true 
  });