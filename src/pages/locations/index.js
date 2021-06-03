import React, { Fragment } from 'react';
// Apollo
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
// Components
import PageContainer from './../../components/shared/layouts/PageContainer';
import Hero from './../../components/location-finder/Hero';
//import SearchHeader from './../../components/location-finder/SearchHeader';
import Locations from './../../components/location-finder/Locations/Locations';
import SearchResultsDetails from './../../components/location-finder/SearchResultsDetails';
import Map from './../../components/location-finder/Map';
import BottomPromo from '../../components/location-finder/BottomPromo';
import SearchForm from '../../components/location-finder/SearchForm';
import SearchHeader from './../../components/shared/SearchHeader';
import RightRailContent from '../../components/location-finder/RightRail/content';
import MenuGroup from './../../components/shared/MenuGroup';

function LocationFinder() {
  return (
    <PageContainer
      metaTags={{
        title: 'Location Finder',
        description: 'The New York Public Library offers locations throughout the Bronx, Manhattan, and Staten Island.',
        url: 'https://www.nypl.org/locations'
      }}
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
          <Fragment>
            {RightRailContent.map((menu) => {
              return (
                <MenuGroup
                  id={menu.id}
                  headingId={menu.title.toLowerCase().replace(/\s/g, '-')}
                  title={menu.title}
                  items={menu.items}
                  orientation="horizontal"
                />
              )
            })}
          </Fragment>
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
