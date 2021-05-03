import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import PageContainer from './../../components/shared/layouts/PageContainer';
import Hero from './../../components/location-finder/Hero';
import SearchHeader from './../../components/location-finder/SearchHeader';
import Locations from './../../components/location-finder/Locations/Locations';
import SearchResultsDetails from './../../components/location-finder/SearchResultsDetails';
import Map from './../../components/location-finder/Map';
import BottomPromo from '../../components/location-finder/BottomPromo';
import RightRail from '../../components/location-finder/RightRail';

function LocationFinder() {
  return (
    <PageContainer
      metaTags={{
        title: 'Location Finder',
        description: 'The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.'
      }}
      wrapperClass='nypl--locations'
      contentHeader={
        <Fragment>
          <Hero />
          <SearchHeader />
        </Fragment>
      }
      contentPrimary={
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
      }
      contentBottom={
        <Fragment>
          <BottomPromo />
          <RightRail />
        </Fragment>
      }
    />
  );
}

export default compose(withApollo, withRedux)(LocationFinder);