import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from '../../../../apollo/client/withApollo';
// Redux
import { withRedux } from '../../../../redux/withRedux';
// Components
import PageContainer from './../../../../components/online-resources/layouts/PageContainer';
import SearchResults from '../../../../components/online-resources/SearchResults';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../../utils/config';
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function OnlineResourcesSearchPage() {
  return (
    <PageContainer
      metaTags={{
        title: 'Online Resources Search',
        description: 'Hello welcome to the NYPL!',
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}/search`
      }}
      breadcrumbs={[
        {
          text: 'Online Resources',
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}/research/collections/online-resources`
        }
      ]}
      showContentHeader={true}
      contentPrimary={
        <SearchResults />
      }
    />
  );
}

export default withApollo(
  withRedux((OnlineResourcesSearchPage)), { 
    ssr: true, 
    redirects: false 
  });