import React from 'react';
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
import Card from './../../ds-prototypes/Card';

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
    <CardGrid title="Most Popular">
      {data.allOnlineResources.map((item) => {
        return (
          <li 
            key={item.id} 
            className="card-grid__list-item"
          >
            <Card
              name={item.name}
              imageUrl={item.imageUrl}
              description={item.description} 
              url={item.slug}
            />
          </li>
        )
      })}
    </CardGrid>
  );
};

export default MostPopularResources;
