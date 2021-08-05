import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
// Components
import PageContainer from './../../components/blogs/layouts/PageContainer';
import ChannelsCards from './../../components/blogs/ChannelsCards/ChannelsCards';
function BlogsChannelsPage() {  
  return (
    <PageContainer
      metaTags={{
        title: 'Blogs: Channels',
        description: 'Hello welcome to the NYPL!',
        url: 'https://www.nypl.org'
      }}
      showContentHeader={true}
      contentPrimary={
        <ChannelsCards />
      }
    />
  );
}

export default withApollo(
  withRedux((BlogsChannelsPage)), {
  ssr: true,
  redirects: false
});
