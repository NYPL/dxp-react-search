import { getDataFromTree } from '@apollo/react-ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Layout from './../../components/shared/layouts/Main';
import Hero from './../../components/location-finder/Hero';
import SearchHeader from './../../components/location-finder/SearchHeader';
import Locations from './../../components/location-finder/Locations/Locations';
import SearchResultsDetails from './../../components/location-finder/SearchResultsDetails';
import Map from './../../components/location-finder/Map';
import Head from 'next/head';
import BottomPromo from '../../components/location-finder/BottomPromo';
import RightRail from '../../components/location-finder/RightRail';

function LocationFinder() {
  return (
    <Layout>
      <Head>
        <title>Location Finder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="content-header">
        <Hero />
        <SearchHeader />
      </div>
      <div className="content-primary">
        <div className='locations'>
          <SearchResultsDetails />
          <div className='locations__list'>
            <Locations />
          </div>
          <div className='locations__map'>
            <Map />
          </div>
        </div>
      </div>
      <div className="content-bottom">
        <BottomPromo />
        <RightRail />
      </div>
    </Layout>
  );
}

export default compose(withApollo, withRedux)(LocationFinder);
