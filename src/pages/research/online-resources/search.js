import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../../redux/withRedux';
// Components
import PageContainer from './../../../components/shared/layouts/PageContainer';
import RightRail from './../../../components/shared/RightRail';
import SearchHeader from './../../../components/shared/SearchHeader';
import SearchForm from './../../../components/online-resources/SearchForm';
import SearchResults from './../../../components/online-resources/SearchResults';
import SidebarMenus from './../../../components/online-resources/SidebarMenus';

function OnlineResourcesSearchPage() {
  return (
    <PageContainer
      metaTags={{
        title: 'Online Resources',
        description: 'Hello welcome to the NYPL!',
        url: 'https://www.nypl.org/research/online-resources'
      }}
      wrapperClass='nypl--research'
      contentHeader={
        <SearchHeader>
          <SearchForm />
        </SearchHeader>
      }
      contentPrimary={
        <Fragment>
          <SearchResults />
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
  withRedux((OnlineResourcesSearchPage)), { 
    ssr: true, 
    redirects: false 
  });