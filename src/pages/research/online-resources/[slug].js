import React, { Fragment } from 'react';
// Next
import { useRouter } from 'next/router';
import Link from 'next/link';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../apollo/client/withApollo';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
// Redux
import { withRedux } from './../../../redux/withRedux';
import { compose } from 'redux';
// Components
import PageContainer from './../../../components/shared/layouts/PageContainer';
import RightRail from './../../../components/location-finder/RightRail';
import SearchForm from './../../../components/online-resources/SearchForm';
import { SkeletonLoader } from '@nypl/design-system-react-components';

const ONLINE_RESOURCE_QUERY = gql`
  query($slug: String) {
    onlineResource(slug: $slug) {
      id
      name
      description
    }
  }
`;

function OnlineResourceSlug() {
  const router = useRouter();
  const { slug } = router.query;

  // Query for data.
  const { loading, error, data } = useQuery(
    ONLINE_RESOURCE_QUERY, {
      variables: {
        slug: `/research/online-resources/${slug}`
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
          <div className='search-header'>
            <div className='search-header__inner'>
              <SearchForm />
            </div>
          </div>
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
        title: `${data.onlineResource.name}`
      }}
      wrapperClass='nypl--research'
      contentHeader={
        <div className='search-header'>
          <div className='search-header__inner'>
            <SearchForm />
          </div>
        </div>
      }
      contentPrimary={
        <Fragment>
          <Link href="/research/online-resources">
            <a><h3>Online Resources</h3></a>
          </Link>

          <div>
            <h1>{data.onlineResource.name}</h1>
            <p>{data.onlineResource.id}</p>
          </div>
        </Fragment>
      }
      showSidebar={true}
      sidebarSide='right'
      contentSecondary={
        <div>Content Secondary!</div>
      }
      contentBottom={
        <RightRail />
      }
    />
  );
}

export default compose(withApollo, withRedux)(OnlineResourceSlug);