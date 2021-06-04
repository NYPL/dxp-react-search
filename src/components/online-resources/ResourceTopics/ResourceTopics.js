import React from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  ResourceTopicsQuery as RESOURCE_TOPICS_QUERY 
} from './ResourceTopics.gql';
// Components
import { 
  SkeletonLoader 
} from '@nypl/design-system-react-components';
import CardGrid from './../../ds-prototypes/CardGrid';
import Card from './../../ds-prototypes/Card';

function ResourceTopics() {
  // Query for data.
  const { loading, error, data } = useQuery(
    RESOURCE_TOPICS_QUERY, {}
  );

  // Error state.
  if (error) {
    return (
      <div>Error while loading Resource Topics.</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <SkeletonLoader />
    );
  }

  return (
    <CardGrid title="Featured Resources">
      {data.allResourceTopics.map((item) => {
        return (
          <li 
            key={item.id} 
            className="card-grid__list-item"
          >
            <Card
              name={item.name}
              imageUrl={item.imageUrl}
              description={item.description} 
              url={item.url}
            />
          </li>
        )
      })}
    </CardGrid>
  );
};

export default ResourceTopics;