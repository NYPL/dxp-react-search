import React, { Fragment, useEffect, useState } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Map
import Map from './../Map';
// Redux
import {
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import {
  setSearchQuery,
  setMapPosition,
  setLocationInfoWindowId,
  setAutoSuggestInputValue,
  setPagination
} from './../../../redux/actions';
// Components
import * as DS from '@nypl/design-system-react-components';
import Location from './../Location';
import LoadingSkeleton from './../../shared/LoadingSkeleton';
import LocationsPagination from './LocationsPagination';
// Hooks
import useWindowSize from './../../../hooks/useWindowSize';

function Locations() {
  // Special handling for pagination on desktop
  const windowSize = useWindowSize();
  // Set limit based on window size, to disable pagination for desktop only.
  let limit = 300;
  if (windowSize < 600) {
    limit = 10;
  }

  // Redux
  const {
    searchQuery,
    searchQueryGeoLat,
    searchQueryGeoLng,
    openNow,
    offset,
    pageNumber
  } = useSelector(state => state.search);

  const dispatch = useDispatch();

  // Apollo
  const searchGeoLat = searchQueryGeoLat ? searchQueryGeoLat : null;
  const searchGeoLng = searchQueryGeoLng ? searchQueryGeoLng : null;
  // Query for data.
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    LOCATIONS_QUERY, {
      variables: {
        searchGeoLat,
        searchGeoLng,
        openNow,
        limit,
        offset,
        pageNumber
      },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true
    }
  );

  // Side effect to dispatch redux action to set pagination redux state.
  useEffect(() => {
    if (data) {
      console.log('useEffect!');
      // Dispatch redux action
      dispatch(setPagination({
        pageNumber: pageNumber,
        offset: offset,
        pageCount: Math.ceil(data.allLocations.pageInfo.totalItems / limit),
        resultsCount: data.allLocations.locations.length
      }));
    }
  }, [data])

  // Loading state,
  if (loading || !data) {
    return (
      <LoadingSkeleton />
    );
  }

  // No results.
  if (data.allLocations.locations.length === 0) {
    return (
      <div className='no-results'>Try adjusting search terms or filters.</div>
    );
  }

  // Error state.
  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  return (
    <div className="locations__list-inner">
      <DS.Link
        href="#locations-gmap"
        className="locations-gmap-anchor"
      >
        Skip to Map
        <DS.Icon
          blockName="more-link"
          decorative
          modifiers={[
            'right'
          ]}
          name="arrow"
        />
      </DS.Link>
      {data.allLocations.locations.map((location) => (
        <Location key={location.id} location={location} />
      ))}
      <LocationsPagination limit={limit} />
    </div>
  );
}

export default Locations;
