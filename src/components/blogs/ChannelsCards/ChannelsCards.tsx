import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import {
  //Card,
  CardHeading,
  CardContent,
  CardImageRatios,
  Heading,
  List,
} from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardGridSkeleton from "../../ds-prototypes/CardGrid/CardGridSkeleton";
import Card from "../../shared/Card";
import Image from "../../shared/Image";
// Next components
import Link from "next/link";

interface ChannelsCardsProps {
  limit?: number;
  sortBy?: string;
  featured?: boolean;
}

const CHANNELS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query ChannelsQuery($vocabulary: String, $sortBy: String, $limit: Int) {
    allTermsByVocab(vocabulary: $vocabulary, sortBy: $sortBy, limit: $limit) {
      ...TermBaseFields
      ...ImageFields
      slug
    }
  }
`;

function ChannelsCards({ limit, sortBy, featured }: ChannelsCardsProps) {
  // Query for data.
  const { loading, error, data } = useQuery(CHANNELS_QUERY, {
    variables: {
      vocabulary: "channel",
      sortBy: sortBy ? sortBy : null,
      limit: limit ? limit : null,
      featured: featured ? featured : null,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading channels.</div>;
  }

  // Loading state,
  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Heading id="explore-by-channel" level={2} text="Explore by Channel" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam
        est, ac varius integer pharetra nulla pellentesque. Nunc neque enim
        metus ut volutpat turpis nascetur.
      </p>
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

export default ChannelsCards;
