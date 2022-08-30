import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import CardSet from "../../shared/Card/CardSet";
import { Grid } from "@nypl/design-system-react-components";
import CardGridSkeletonLoader from "../../shared/Card/CardGridSkeletonLoader";
import Card from "../../shared/Card";
import Image from "../../shared/Image";

interface ResourceTopicsProps {
  id: string;
  title: string;
  limit?: number;
  sort?: string;
  featured?: boolean;
}

export const RESOURCE_TOPICS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query ResourceTopicsQuery(
    $vocabulary: String
    $sort: Sort
    $limit: Int
    $filter: TermQueryFilter
  ) {
    allTermsByVocab(
      vocabulary: $vocabulary
      sort: $sort
      limit: $limit
      filter: $filter
    ) {
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
  sort,
  featured,
}: ResourceTopicsProps) {
  let queryFilters: any = {};
  if (featured) {
    queryFilters["featured"] = {
      fieldName: "field_bs_featured",
      operator: "=",
      value: featured,
    };
  }

  // Query for data.
  const { loading, error, data } = useQuery(RESOURCE_TOPICS_QUERY, {
    variables: {
      vocabulary: "resource_topic",
      sort: sort ? sort : null,
      limit: limit ? limit : null,
      featured: featured ? featured : null,
      filter: queryFilters,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading resource topics.</div>;
  }

  // Loading state.
  if (loading || !data) {
    return (
      <CardSet id={id} title={title}>
        <CardGridSkeletonLoader
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="m"
          itemsCount={6}
        />
      </CardSet>
    );
  }

  return (
    <CardSet id={id} title={title}>
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="m"
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
            />
          </li>
        ))}
      </Grid>
    </CardSet>
  );
}

export default ResourceTopics;
