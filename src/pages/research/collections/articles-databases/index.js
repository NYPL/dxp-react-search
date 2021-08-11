import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../../../redux/withRedux';
// Components
import PageContainer from './../../../../components/online-resources/layouts/PageContainer';
import AlphabetNav from './../../../../components/online-resources/AlphabetNav';
import ResourceTopics from './../../../../components/online-resources/ResourceTopics';
import MostPopularResources from './../../../../components/online-resources/MostPopularResources';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../../utils/config';
import onlineResourcesContent from './../../../../__content/onlineResources';

function OnlineResources() {  
  const { title, description } = onlineResourcesContent;

  return (
    <PageContainer
      metaTags={{
        title: title,
        description: description,
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}`
      }}
      showContentHeader={true}
      contentPrimary={
        <Fragment>
          <ResourceTopics />
          <MostPopularResources />
          <AlphabetNav 
            title={'A-Z Articles & Databases'}
            description={'Browse resources and databases alphabetically by name'}
          />
        </Fragment>
      }
    />
  );
}

export default withApollo(
  withRedux((OnlineResources)), {
  ssr: true,
  redirects: false
});