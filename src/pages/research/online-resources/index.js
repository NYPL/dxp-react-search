import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../../redux/withRedux';
import { compose } from 'redux';
// Components
import PageContainer from './../../../components/shared/layouts/PageContainer';
import RightRail from './../../../components/location-finder/RightRail';
import SearchForm from './../../../components/online-resources/SearchForm';
import SearchResults from './../../../components/online-resources/SearchResults';
import ResourceTopics from './../../../components/online-resources/ResourceTopics';
import MostPopularResources from './../../../components/online-resources/MostPopularResources';


function OnlineResources() {
  return (
    <PageContainer
      metaTags={{
        title: 'Online Resources',
        description: 'Hello welcome to the NYPL!'
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
          <SearchResults />
          <ResourceTopics />
          <MostPopularResources />
        </Fragment>
      }
      contentBottom={
        <RightRail />
      }
    />
  );
}

export default compose(withApollo, withRedux)(OnlineResources);
