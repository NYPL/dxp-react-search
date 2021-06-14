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

function OnlineResources() {
  
  // Placeholder sample data for AlphabetNav
  const activeLetters = [
    'A','C','D','E','H','L','M','N','P','R','S','T','V','W'
  ]

  // Placeholder callback function for AlphabetNav
  const onPageChange = (letter) => {
    if (letter) {
      console.log("Filtered Resources by the letter " + letter);
    } else {
      console.log("Showing all - no filtering by letter");
    }
  }
  
  return (
    <PageContainer
      metaTags={{
        title: 'Online Resources',
        description: 'Hello welcome to the NYPL!',
        url: `https://www.nypl.org${ONLINE_RESOURCES_BASE_PATH}`
      }}
      contentPrimary={
        <Fragment>
          <AlphabetNav 
            title={'A-Z Online Resources'}
            description={'Browse resources and databases alphabetically by name'}
            activeLetters={activeLetters}
            onPageChange={onPageChange}
          />
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
