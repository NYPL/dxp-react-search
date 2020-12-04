import React, { Fragment } from 'react';
// Apollo
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
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

  // Error state.
  if (error) {
    return (
      <div>'error while loading locations'</div>
    );
  }

  // Loading state,
  if (/*!error &&*/ loading || !data) {
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

  return (
    <div className="locations__list-inner">
      {data.allLocations.locations.map((location) => (
        <div key={location.slug}>
          <h1>{location.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default LocationsEasy;
