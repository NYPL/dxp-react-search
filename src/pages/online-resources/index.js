import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Meta from './../../components/location-finder/Meta';
import Layout from './../../components/shared/layouts/Main';

import ResourceTopics from './../../components/online-resources/ResourceTopics';
import SearchResults from './../../components/online-resources/SearchResults';

import RightRail from '../../components/location-finder/RightRail';

import SearchForm from './../../components/online-resources/SearchForm';

function OnlineResources() {
  return (
    <Layout>
      <Meta />
      <div className="content-header">
        
        <div className='search-header'>
          <div className='search-header__inner'>
            <SearchForm />
          </div>
        </div>

      </div>
      <div className="content-primary">
        <SearchResults />
        <ResourceTopics />
      </div>
      <div className="content-bottom">
        <RightRail />
      </div>
    </Layout>
  );
}

export default compose(withApollo, withRedux)(OnlineResources);
