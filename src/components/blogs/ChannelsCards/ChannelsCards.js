import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import {
  Card,
  CardHeading,
  CardContent,
  CardImageRatios,
  Heading,
  List,
} from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardGridSkeleton from "../../ds-prototypes/CardGrid/CardGridSkeleton";
//import Card from "../../shared/Card";
import Image from "../../shared/Image";
// Next components
import Link from "next/link";

const CHANNELS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query ChannelsQuery($vocabulary: String) {
    allTermsByVocab(vocabulary: $vocabulary) {
      ...TermBaseFields
      ...ImageFields
      url
    }
  }
`;

function ChannelsCards() {
  // Query for data.
  const { loading, error, data } = useQuery(CHANNELS_QUERY, {
    variables: {
      vocabulary: "channel",
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

  const channels = data.allTermsByVocab;

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
        {channels.map((item) => {
          return (
            <li key={item.id}>
              <Card
                imageComponent={
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
              >
                <CardHeading level={3}>
                  {item.url && (
                    <Link href={item.url}>
                      <a>{item.name}</a>
                    </Link>
                  )}
                </CardHeading>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </CardGrid>
    </div>
  );
}

export default ChannelsCards;
