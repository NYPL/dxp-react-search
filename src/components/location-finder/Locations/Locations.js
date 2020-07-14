import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import SearchBar from './../SearchBar';
import Location from './../Location';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
import styles from './Locations.module.css';

// Redux
import { useSelector } from 'react-redux';

function Locations() {
  const { loading, error, data, networkStatus } = useQuery(
    LOCATIONS_QUERY,
    {
      //notifyOnNetworkStatusChange: false,
      //fetchPolicy: 'no-cache',
    }
  );

  const searchGeo = useSelector(state => state.search.searchGeo);
  console.log('searchGeo state: ' + searchGeo);

  /*console.log('loading: ' + loading);
  console.log('error: ' + error);
  console.log('data: ' + data);
  */

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
      <SearchBar />
      {searchGeo ? (
        <div>
          Showing 10 locations near <strong>{searchGeo}</strong>
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
