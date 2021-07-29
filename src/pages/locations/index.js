import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
// Components
import PageContainer from './../../components/shared/layouts/PageContainer';
import SearchHeader from './../../components/shared/SearchHeader';
import Hero from './../../components/location-finder/Hero';
import SearchForm from '../../components/location-finder/SearchForm';
import Locations from './../../components/location-finder/Locations/Locations';
import SearchResultsDetails from './../../components/location-finder/SearchResultsDetails';
import Map from './../../components/location-finder/Map';
import BottomPromo from '../../components/location-finder/BottomPromo';
import BottomMenuContent from '../../components/shared/BottomMenus/content';
import RightRail from '../../components/shared/RightRail';
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

function LocationFinder() {
  return (
    <PageContainer
      metaTags={{
        title: 'Location Finder',
        description: 'The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.',
        url: 'https://www.nypl.org/locations'
      }}
      breadcrumbs={[
        {
          text: 'Home',
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`
        }
      ]}
      wrapperClass='nypl--locations'
      contentHeader={
        <Fragment>
          <Hero />
          <SearchHeader
            titleId={'location-finder__title'}
            title={'Find Your Library'}
          >
            <SearchForm />
          </SearchHeader>
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
          <RightRail menuContent={BottomMenuContent} orientation="horizontal" />
        </Fragment>
      }
    />
  );
}

export default withApollo(
  withRedux((LocationFinder)), {
  ssr: true,
  redirects: false
});
