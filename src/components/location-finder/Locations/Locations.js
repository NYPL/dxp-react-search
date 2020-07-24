import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Location from './../Location';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Map
import Map from './../Map';
const { NEXT_PUBLIC_GOOGLE_MAPS_API } = process.env;
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
              <Location location={location} />
            ))}
          </div>
        </div>
        <div className='column'>
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${NEXT_PUBLIC_GOOGLE_MAPS_API}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </div>
  );
}

export default Locations;
