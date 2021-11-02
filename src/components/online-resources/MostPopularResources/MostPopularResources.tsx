import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";

interface MostPopularResourcesProps {
  id: string;
  title: string;
}

const MOST_POPULAR_RESOURCES_QUERY = gql`
  query MostPopularResourcesQuery($mostPopular: Boolean) {
    allOnlineResources(filter: { mostPopular: $mostPopular }) {
      items {
        id
        name
        description
        slug
      }
    }
  }
`;

function MostPopularResources({ id, title }: MostPopularResourcesProps) {
  // Query for data.
  const { loading, error, data } = useQuery(MOST_POPULAR_RESOURCES_QUERY, {
    variables: {
      mostPopular: true,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading most popular.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return (
      <CardSet id={id} title={title}>
        <CardSkeletonLoader
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap="1.25rem"
          itemsCount={3}
        />
      </CardSet>
    );
  }

  return (
    <CardSet id={id} title={title}>
      <CardGrid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1.25rem"
      >
        {data.allOnlineResources.items.map(
          (item: {
            id: string;
            name: string;
            description: string;
            slug: string;
          }) => (
            <li key={item.id}>
              <Card
                id={item.id}
                title={item.name}
                description={item.description}
                url={item.slug}
              />
            </li>
          )
        )}
      </CardGrid>
    </CardSet>
  );
}

export default MostPopularResources;
