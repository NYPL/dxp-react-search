import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import { CardImageRatios, Heading } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";
import Image from "../../shared/Image";

interface ResourceTopicsProps {
  limit?: number;
  sortBy?: string;
  featured?: boolean;
}

const RESOURCE_TOPICS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query ResourceTopicsQuery($vocabulary: String, $sortBy: String, $limit: Int) {
    allTermsByVocab(vocabulary: $vocabulary, sortBy: $sortBy, limit: $limit) {
      ...TermBaseFields
      ...ImageFields
      slug
    }
  }
`;

function ResourceTopics({ limit, sortBy, featured }: ResourceTopicsProps) {
  // Query for data.
  const { loading, error, data } = useQuery(RESOURCE_TOPICS_QUERY, {
    variables: {
      vocabulary: "resource_topic",
      sortBy: sortBy ? sortBy : null,
      limit: limit ? limit : null,
      featured: featured ? featured : null,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading resource topics.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading id="featured-resources" level={2} text="Featured Resources" />
      <CardGrid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="1.25rem"
      >
        {data.allTermsByVocab.map((item: any) => (
          <li key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              description={item.description}
              url={item.slug}
              image={
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
              }
              imageAspectRatio={CardImageRatios.TwoByOne}
            />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

export default ResourceTopics;
