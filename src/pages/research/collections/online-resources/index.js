import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../../../redux/withRedux';
// Components
import PageContainer from './../../../../components/online-resources/layouts/PageContainer';
import ResourceTopics from './../../../../components/online-resources/ResourceTopics';
import MostPopularResources from './../../../../components/online-resources/MostPopularResources';
// Utils
import { ONLINE_RESOURCES_BASE_PATH } from './../../../../utils/config';

function OnlineResources() {
  return (
    <PageContainer
      metaTags={{
        title: 'Online Resources',
        description: 'Hello welcome to the NYPL!',
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}`
      }}
      contentPrimary={
        <Fragment>
          <ResourceTopics />
          <MostPopularResources />
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