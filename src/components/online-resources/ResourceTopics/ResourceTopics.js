import React, { Fragment, useState } from 'react';
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
//import Card from './../../shared/Card';
import CardGrid from './../../shared/CardGrid';

function ResourceTopics() {
  // Query for data.
  const { loading, error, data } = useQuery(
    RESOURCE_TOPICS_QUERY, {}
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
    <Fragment>
      <CardGrid
        title="Featured Resources"
        items={data.allResourceTopics}
      />
    </Fragment>
  );
};

export default ResourceTopics;
