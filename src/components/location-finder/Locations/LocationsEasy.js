import React, { Fragment } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { LocationsQuery as LOCATIONS_QUERY } from './LocationsEasy.gql';

// Components
import * as DS from '@nypl/design-system-react-components';
import Location from './../Location';
import LoadingSkeleton from './../../shared/LoadingSkeleton';
import LocationsPagination from './LocationsPagination';

function LocationsEasy() {
  // Query for data.
  const { loading, error, data } = useQuery(
    LOCATIONS_QUERY, {}
  );

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
      {data.allLocations.locations.map((location) => (
        <h1>{location.id}</h1>
      ))}
    </div>
  );
}

export default LocationsEasy;
