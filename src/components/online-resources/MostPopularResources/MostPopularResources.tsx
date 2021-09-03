import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import { Heading } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";

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

function MostPopularResources() {
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
    return <div>Loading</div>;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading id="most-popular" level={2} text={"Most Popular"} />
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
    </div>
  );
}

export default MostPopularResources;
