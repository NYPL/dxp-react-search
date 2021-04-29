import { getDataFromTree } from '@apollo/client/react/ssr';

import { useRouter } from 'next/router';

import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Meta from './../../components/location-finder/Meta';
import RightRail from '../../components/location-finder/RightRail';
import Layout from './../../components/shared/layouts/Main';
//
import SearchForm from './../../components/online-resources/SearchForm';
import OnlineResource from './../../components/online-resources/OnlineResource';
import ResourceTopics from './../../components/online-resources/ResourceTopics';

function OnlineResourceSlug() {
  const router = useRouter();
  const { slug } = router.query;

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
        <OnlineResource slug={slug} />
        <ResourceTopics />
      </div>
      <div className="content-bottom">
        <RightRail />
      </div>
    </Layout>
  );
}

export default compose(withApollo, withRedux)(OnlineResourceSlug);