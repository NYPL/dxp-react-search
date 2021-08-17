import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { ResourceTopicsQuery as RESOURCE_TOPICS_QUERY } from "./ResourceTopics.gql";
// Components
import { List } from "@nypl/design-system-react-components";
import CardGrid from "./../../ds-prototypes/CardGrid";
//import Card from './../../ds-prototypes/Card';
import CardGridSkeleton from "./../../ds-prototypes/CardGrid/CardGridSkeleton";

import Card from "../../shared/Card";
import Image from "../../shared/Image";

function ResourceTopics() {
  // Query for data.
  const { loading, error, data } = useQuery(RESOURCE_TOPICS_QUERY, {});

  // Error state.
  if (error) {
    return <div>Error while loading Resource Topics.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div className="card-grid">
        <List
          className="card-grid__list"
          modifiers={["no-list-styling"]}
          type="ul"
        >
          <li className="card-grid__list-item">
            <CardGridSkeleton />
          </li>
          <li className="card-grid__list-item">
            <CardGridSkeleton />
          </li>
          <li className="card-grid__list-item">
            <CardGridSkeleton />
          </li>
        </List>
      </div>
    );
  }

  return (
    <CardGrid title="Featured Resources">
      {data.allResourceTopics.map((item) => {
        return (
          <li key={item.id} className="card-grid__list-item">
            <Card
              name={item.name}
              imageUrl={item.imageUrl}
              description={item.description}
              url={item.url}
            />
            <Card
              id={item.id}
              name={item.name}
              description={item.description}
              image={
                <Image
                  id={item.image.id}
                  alt={item.image.alt}
                  uri={item.image.uri}
                  useTransformation={false}
                  layout="responsive"
                  width={900}
                  height={450}
                  quality={90}
                />
              }
              url={item.url}
            />
          </li>
        );
      })}
    </CardGrid>
  );
}

export default ResourceTopics;
