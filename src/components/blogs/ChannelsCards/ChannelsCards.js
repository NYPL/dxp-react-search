import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { ChannelCardsQuery as CHANNELS_QUERY } from "./ChannelCards.gql";
// Components
import { List } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardGridSkeleton from "../../ds-prototypes/CardGrid/CardGridSkeleton";
import Card from "../../shared/Card";
import Image from "../../shared/Image";

function ChannelsCards() {
  // Query for data.
  const { loading, error, data } = useQuery(CHANNELS_QUERY, {
    variables: {
      type: "channel",
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

  return (
    <CardGrid
      title="Explore by Channel"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam est, ac varius integer pharetra nulla pellentesque. Nunc neque enim metus ut volutpat turpis nascetur."
    >
      {data.allChannels.map((item) => {
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

export default ChannelsCards;
