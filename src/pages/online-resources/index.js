import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Meta from './../../components/location-finder/Meta';
import Layout from './../../components/shared/layouts/Main';

import ResourceTopics from './../../components/online-resources/ResourceTopics';
import RightRail from '../../components/location-finder/RightRail';

function OnlineResources() {
  return (
    <Layout>
      <Meta />
      <div className="content-header">
        
      </div>
      <div className="content-primary">
        <ResourceTopics type="featured" />

        <ResourceTopics type="mostPopular" />
      </div>
      <div className="content-bottom">
        <RightRail />
      </div>
    </Layout>
  );
}

export default compose(withApollo, withRedux)(OnlineResources);
