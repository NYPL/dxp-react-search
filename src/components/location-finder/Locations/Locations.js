import React, { Fragment, useEffect, useState } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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
import Skeleton from 'react-loading-skeleton';
import LocationsPagination from './LocationsPagination';

function Locations() {
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
  const limit = 10;
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

  // Side effect to dispatch redux action to set the locations count.
  useEffect(() => {
    if (data) {
      console.log('Locations useEffect');

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
      <Skeleton
        height={20}
        count={20}
        duration={1.2}
      />
    );
  }

  // No results.
  if (data.allLocations.length === 0) {
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
    <Fragment>
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
    </Fragment>
  );
}

export default Locations;
