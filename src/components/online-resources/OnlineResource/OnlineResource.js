import React from 'react';
import Meta from './../../shared/Meta';
// Components
import { 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
// Apollo
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const ONLINE_RESOURCE_QUERY = gql`
  query($slug: String) {
    onlineResource(slug: $slug) {
      id
      name
      description
    }
  }
`;

function OnlineResource({ slug }) {
  // Query for data.
  const { loading, error, data } = useQuery(
    ONLINE_RESOURCE_QUERY, {
      variables: {
        slug: `/research/online-resources/${slug}`
      }
    }
  );

  // Error state.
  if (error) {
    return (
      <div>Error while loading Online Resource.</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <SkeletonLoader />
    );
  }

  return (
    <div>
      <Meta
        title={data.onlineResource.name}
      />
      <h1>{data.onlineResource.name}</h1>
      <p>{data.onlineResource.id}</p>
    </div>
  );
}

export default OnlineResource;