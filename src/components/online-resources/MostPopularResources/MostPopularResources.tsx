import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";

const MOST_POPULAR_RESOURCES_QUERY = gql`
  query MostPopularResourcesQuery(
    $limit: Int
    $pageNumber: Int
    $filter: OnlineResourceFilter
    $sort: Sort
  ) {
    allOnlineResources(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $filter
    ) {
      items {
        id
        name
        description
        slug
      }
    }
  }
`;

interface MostPopularResourcesProps {
  id: string;
  title: string;
}

function MostPopularResources({ id, title }: MostPopularResourcesProps) {
  // Query for data.
  const { loading, error, data } = useQuery(MOST_POPULAR_RESOURCES_QUERY, {
    variables: {
      limit: 3,
      pageNumber: 1,
      filter: {
        mostPopular: {
          fieldName: "field_is_most_popular",
          operator: "IS NOT NULL",
          value: null,
        },
      },
      sort: {
        field: "field_is_most_popular",
        direction: "ASC",
      },
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
