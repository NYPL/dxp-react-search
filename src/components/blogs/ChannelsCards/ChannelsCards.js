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

  const channels = data.allTermsByVocab;

  return (
    <CardGrid
      title="Explore by Channel"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam est, ac varius integer pharetra nulla pellentesque. Nunc neque enim metus ut volutpat turpis nascetur."
    >
      {channels.map((item) => {
        return (
          <li key={item.id} className="card-grid__list-item">
            <Card>
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
  );
}

export default ChannelsCards;
