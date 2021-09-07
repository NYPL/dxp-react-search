import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import { CardImageRatios } from "@nypl/design-system-react-components";
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";
import Image from "../../shared/Image";

interface ResourceTopicsProps {
  id: string;
  title: string;
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

function ResourceTopics({
  id,
  title,
  limit,
  sortBy,
  featured,
}: ResourceTopicsProps) {
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
    return (
      <CardSet id={id} title={title}>
        <CardSkeletonLoader
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap="1.25rem"
          itemsCount={6}
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
    </CardSet>
  );
}

export default ResourceTopics;
