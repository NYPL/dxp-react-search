import React, { Fragment, useEffect } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Map
import Map from './../Map';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setMapPosition,
  setLocationInfoWindowId,
  setAutoSuggestInputValue,
  setSearchResultsCount
} from './../../../redux/actions';
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
    openNow,
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : 40.7532;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : -73.9822;
  const { loading, error, data, networkStatus } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        searchGeoLat,
        searchGeoLng,
        openNow
      }
    }
  );

  // Side effect to dispatch redux action to set the locations count.
  useEffect(() => {
    if (data) {
      dispatch(setSearchResultsCount({
        resultsCount: data.allLocations.length
      }));
    }
  }, [data])

  // Loading state,
  if (loading || !data) {
    return (
      <Skeleton
        height={20}
        count={20}
        duration={1.2}
      />
    );
  }

  // Error state.
  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  // Clear search terms.
  function onClearSearchTerms(e) {
    e.preventDefault();

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
    <Fragment>
      {data.allLocations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
    </Fragment>
  );
}

export default Locations;
