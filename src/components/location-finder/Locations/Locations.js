import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Location from './../Location';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Map
import Map from './../Map';
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
    <div className='locations'>
      <div className='row'>
        <div className='column locations__list'>

          {searchQuery ? (
            <div>
              Showing all locations near <strong>{searchQuery}</strong>
              <br />
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
