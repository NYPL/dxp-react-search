import { getDataFromTree } from '@apollo/react-ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Layout from './../../components/shared/layouts/Main';
import SearchHeader from './../../components/location-finder/SearchHeader';
import Locations from './../../components/location-finder/Locations/Locations';
import Head from 'next/head';
import BottomPromo from '../../components/location-finder/BottomPromo';

function LocationFinder() {
  return (
    <Layout>
      <Head>
        <title>Location Finder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="content-header">
        <SearchHeader />
      </div>
      <div className="content-primary">
        <Locations />
      </div>
      <div className="content-bottom">
        <BottomPromo />
      </div>
    </Layout>
  );
}

export default compose(withApollo, withRedux)(LocationFinder);
