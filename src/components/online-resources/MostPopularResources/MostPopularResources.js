import React, { Fragment, useState } from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  MostPopularResourcesQuery as MOST_POPULAR_RESOURCES_QUERY 
} from './MostPopularResources.gql';
// Components
import { 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import CardGrid from './../../ds-prototypes/CardGrid';

function MostPopularResources() {
  // Query for data.
  const { loading, error, data } = useQuery(
    MOST_POPULAR_RESOURCES_QUERY, {
      variables: {
        mostPopular: true
      }
    }
  );

  // Error state.
  if (error) {
    return (
      <div>Error while loading most popular.</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <SkeletonLoader />
    );
  }

  return (
    <Fragment>
      <CardGrid
        title="Most Popular"
        items={data.allOnlineResources}
      />
    </Fragment>
  );
};

export default MostPopularResources;
