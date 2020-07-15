import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Location from './../Location';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
import styles from './Locations.module.css';
// Redux
import { useSelector } from 'react-redux';

function Locations() {
  const { loading, error, data, networkStatus } = useQuery(
    LOCATIONS_QUERY, {}
  );
  // Redux
  const { searchQuery, searchQueryGeoLat, searchQueryGeoLng } = useSelector(state => state.search);

  if (loading || !data) {
    return (
      <div>Loading</div>
    );
  }

  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  return (
    <div>
      {searchQuery ? (
        <div>
          Showing all locations near <strong>{searchQuery}</strong>
          <br />
          <div>searchQueryGeoLat: {searchQueryGeoLat}</div>
          <div>searchQueryGeoLng: {searchQueryGeoLng}</div>
        </div>
      ) : (
        null
      )}

      <div>
        {data.allLocations.map((location) => (
          <Location location={location} />
        ))}
      </div>
    </div>
  );
}

export default Locations;
