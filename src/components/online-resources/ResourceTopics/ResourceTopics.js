import React, { useEffect, useState } from 'react';
// Apollo
import { useQuery } from '@apollo/client';
import { 
  ResourceTopicsQuery as RESOURCE_TOPICS_QUERY 
} from './ResourceTopics.gql';
// Components
import { 
  Heading,
  Image,
  Link,
  List,
  SkeletonLoader 
} from '@nypl/design-system-react-components';

/*function PromoCard(props) {
  return (
    <div className="promo-card">
      <Link
        href={props.link}
        className="promo-link"
      >
      </Link>
    </div>
  );
}
*/

function ResourceTopics(props) {
  const { type } = props;

  const title = type === 'featured' ? 'Featured Resources' : "Most Popular";

  // Query for data.
  const { loading, error, data } = useQuery(
    RESOURCE_TOPICS_QUERY, {
      variables: {
        featured: type === 'featured' ? true : false,
        mostPopular: type === 'mostPopular' ? true : false
      }
    }
  );

  // Error state.
  if (error) {
    return (
      <div>Error while loading Resource Topics.</div>
    );
  }

  // Loading state,
  if (loading || !data) {
    return (
      <SkeletonLoader />
    );
  }

  return (
    <div>
      <Heading
        id="resource-topics__heading"
        level={2}
        text={title}
      />
      <List
        className="featured-cards"
        modifiers={[
          'no-list-styling'
        ]}
        type="ul"
      >
        {data.allResourceTopics.map((resourceTopic) => {
          return (
            <li 
              key={resourceTopic.id} 
              className="featured-card"
              style={{
                'margin-bottom': '2rem',
                'flex': '1 0 calc(33% - 2rem)',
                'margin-right': '2rem'
              }}
            >
              <Image
                alt=""
                imageCredit={null}
                modifiers={null}
                src="https://cdn-d8.nypl.org/s3fs-public/styles/2_1_640/public/2020-07/SASB_06_29_2020_Lions_mask-00207%20copy_0.jpeg?h=c8e955ed&itok=Ofco90Kx"
              />
              <Heading
                className="resource-topics__heading-item"
                level={3}
                text={resourceTopic.name}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: resourceTopic.description 
                }}></div>
            </li>
          )
        })}
      </List>
    </div>
  );
};

export default ResourceTopics;
