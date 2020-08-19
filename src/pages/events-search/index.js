import React from 'react';
//import Layout from './../../components/shared/layouts/Main';
import { getDataFromTree } from '@apollo/react-ssr';
import { withApollo } from './../../apollo/client/withApollo';
// Redux
import { withRedux } from './../../redux/withRedux';
import { compose } from 'redux';
// Components
import Map from './../../components/location-finder/Map';
import Hero from './../../components/location-finder/Hero';
import SearchHeader from './../../components/location-finder/SearchHeader';
import { Header, navConfig } from '@nypl/dgx-header-component';
//import Locations from './../../components/location-finder/Locations/Locations';
//import * as DS from '@nypl/design-system-react-components';

function EventsSearch() {
  return (
    <div>
      <Header
        skipNav={{ target: 'main-content' }}
        navData={navConfig.current}
      />
      <h1>Events Search</h1>
      <Hero />
      <SearchHeader />
      <Map />
    </div>
  );
}

export default compose(withApollo, withRedux)(EventsSearch);
