import React, { Fragment } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Map
import Map from './../Map';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setMapPosition, setLocationInfoWindowId, setAutoSuggestInputValue } from './../../../redux/actions';
// Components
import * as DS from '@nypl/design-system-react-components';
import Location from './../Location';
import Skeleton from 'react-loading-skeleton';

function Locations() {
  // Redux
  const {
    searchQuery,
    searchQueryGeoLat,
    searchQueryGeoLng,
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : 40.7532;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : -73.9822;

  const { loading, error, data, networkStatus } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        searchGeoLat,
        searchGeoLng
      }
    }
  );

  if (loading || !data) {
    console.log(loading);

    return (
      <Skeleton
        height={20}
        count={20}
        duration={1.2}
      />
    );
  }

  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  return (
    <Fragment>
      {data.allLocations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
    </Fragment>
  );
}

export default Locations;
