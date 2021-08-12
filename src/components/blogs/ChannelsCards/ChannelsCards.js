import React from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import {
  ChannelCardsQuery as CHANNELS_QUERY
} from './ChannelCards.gql';
// Components
import {
  List
} from '@nypl/design-system-react-components';
import CardGrid from './../../ds-prototypes/CardGrid';
import Card from './../../ds-prototypes/Card';
import CardGridSkeleton from './../../ds-prototypes/CardGrid/CardGridSkeleton';

function ChannelsCards() {
  // Query for data.
  const { loading, error, data } = useQuery(
    CHANNELS_QUERY, {
      variables: {
        type: 'channel'
      }
    }
  );

  // Error state.
  if (error) {
    return (
      <div>Error while loading channels.</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <div className="card-grid">
        <List
          className="card-grid__list"
          modifiers={[
            'no-list-styling'
          ]}
          type="ul"
        >
          <li
            className="card-grid__list-item"
          ><CardGridSkeleton /></li>
          <li
            className="card-grid__list-item"
          ><CardGridSkeleton /></li>
          <li
            className="card-grid__list-item"
          ><CardGridSkeleton /></li>
        </List>
      </div>
    );
  }

  function getImageTransformation(id, image) {
    let imageUri;
    image.transformations.map(transformation => {
      if (transformation.label === id) {
        imageUri = transformation.uri;
      }
    });
    return imageUri;
  }

  return (
    <CardGrid 
      title="Explore by Channel"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, in quam est, ac varius integer pharetra nulla pellentesque. Nunc neque enim metus ut volutpat turpis nascetur."
    >
      {data.allChannels.map((item) => {
        return (
          <li
            key={item.id}
            className="card-grid__list-item"
          >
            <Card
              name={item.name}
              imageUrl={getImageTransformation('2_1_960', item.image)}
              description={item.description}
              url={item.url}
            />
          </li>
        )
      })}
    </CardGrid>
  );
};

export default ChannelsCards;