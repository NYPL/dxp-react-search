import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Location from './../Location';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
import * as DS from '@nypl/design-system-react-components';
// Map
import Map from './../Map';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setMapPosition, setLocationInfoWindowId, setAutoSuggestInputValue } from './../../../redux/actions';

import Skeleton from 'react-loading-skeleton';

function Locations() {
  // Redux
  const {
    searchQuery,
    searchQueryGeoLat,
    searchQueryGeoLng,
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

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
        height={75}
        count={20}
        duration={2}
      />
    );
  }

  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  function onClearSearchTerms(e) {
    e.preventDefault();
    console.log('Clear all search terms!');

    dispatch(setSearchQuery({
      searchQuery: '',
      searchQueryGeoLat: '',
      searchQueryGeoLng: ''
    }));

    const defaultCenter = {
      lat: 40.7532,
      lng: -73.9822
    };

    dispatch(setMapPosition({
      mapCenter: defaultCenter,
      mapZoom: 12
    }));

    // Dispatch to reset the location id for info window.
    dispatch(setLocationInfoWindowId(null));

    // Clear auto suggest input.
    dispatch(setAutoSuggestInputValue(''));
  }

  return (
    <div className='locations'>
      <div className='row'>
        <div className='column locations__list'>

          {searchQuery ? (
            <div>
              Showing all locations near <strong>{searchQuery}</strong>
              <br />
              <DS.Link
                href="#"
                onClick={onClearSearchTerms}
              >
                Clear all search terms
              </DS.Link>
            </div>
          ) : (
            null
          )}

          <div>
            {data.allLocations.map((location) => (
              <Location key={location.id} location={location} />
            ))}
          </div>
        </div>
        <div className='column locations__map'>
          <Map locations={data.allLocations} />
        </div>
      </div>
    </div>
  );
}

export default Locations;
