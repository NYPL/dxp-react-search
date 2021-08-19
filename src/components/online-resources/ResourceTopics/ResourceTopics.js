import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import { List } from "@nypl/design-system-react-components";
import CardGrid from "./../../ds-prototypes/CardGrid";
import CardGridSkeleton from "./../../ds-prototypes/CardGrid/CardGridSkeleton";
import Card from "../../shared/Card";
import Image from "../../shared/Image";

const RESOURCE_TOPICS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query ResourceTopicsQuery($vocabulary: String) {
    allTermsByVocab(vocabulary: $vocabulary) {
      ...TermBaseFields
      ...ImageFields
      url
    }
  }
`;

function ResourceTopics() {
  // Query for data.
  const { loading, error, data } = useQuery(RESOURCE_TOPICS_QUERY, {
    variables: {
      vocabulary: "resource_topic",
    },
  });

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

  const resourceTopics = data.allTermsByVocab;

  return (
    <CardGrid title="Featured Resources">
      {resourceTopics.map((item) => {
        return (
          <li key={item.id} className="card-grid__list-item">
            <Card
              id={item.id}
              name={item.name}
              description={item.description}
              {...(item.image && {
                image: (
                  <Image
                    id={item.image.id}
                    alt={item.image.alt}
                    uri={item.image.uri}
                    useTransformation={true}
                    transformations={item.image.transformations}
                    transformationLabel={"2_1_960"}
                    layout="responsive"
                    width={900}
                    height={450}
                    quality={90}
                  />
                ),
              })}
              url={item.url}
            />
          </li>
        );
      })}
    </CardGrid>
  );
}

export default ResourceTopics;
