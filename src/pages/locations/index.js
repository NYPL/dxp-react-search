import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Meta from './../../components/location-finder/Meta';
import Layout from './../../components/shared/layouts/Main';
import Hero from './../../components/location-finder/Hero';
import HeroImage from './../../components/location-finder/Hero/HeroImage';
import HeroContent from './../../components/location-finder/Hero/content';
import SearchHeader from './../../components/location-finder/SearchHeader';
import Locations from './../../components/location-finder/Locations/Locations';
import SearchResultsDetails from './../../components/location-finder/SearchResultsDetails';
import Map from './../../components/location-finder/Map';
import BottomPromo from '../../components/location-finder/BottomPromo';
import RightRail from '../../components/location-finder/RightRail';
import * as DS from '@nypl/design-system-react-components';

function LocationFinder() {
  // Content
  const { text } = HeroContent;

  return (
    <Layout>
      <Meta />
      <div className="content-header">
        <DS.Hero
          heroType={DS.HeroTypes.FiftyFifty}
          subHeaderText={<span dangerouslySetInnerHTML={{ __html: text }} />}
          image={<div class="hero__image"><HeroImage /></div>}
          backgroundColor="#d0343a"
          foregroundColor="#ffffff"
        >
        </DS.Hero>
        <SearchHeader />
      </div>
      <div className="content-primary">
        <div className='locations'>
          <div className='locations__list' id="locations-list">
            <SearchResultsDetails />
            <Locations />
          </div>
          <div id="locations-gmap" className='locations__map'>
            <div className='locations__map-help-msg'>
              Use two fingers to pan the map.
            </div>
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
