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
import onlineResourcesContent from './../../../../__content/onlineResources';

function OnlineResourcesSearchPage() {
  const { title, description } = onlineResourcesContent;

  return (
    <PageContainer
      metaTags={{
        title: `${title} Search`,
        description: description,
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}/search`
      }}
      breadcrumbs={[
        {
          text: title,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}${ONLINE_RESOURCES_BASE_PATH}`
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