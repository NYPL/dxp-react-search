import React from "react";
import { Box, SkeletonLoader } from "@nypl/design-system-react-components";

export function SearchResultsCardSkeletonLoader(key: any) {
  return (
    <Box marginY="xl" maxWidth="760px" key={key}>
      <SkeletonLoader contentSize={5} headingSize={1} showImage={false} />
    </Box>
  );
}

export function SearchResultsDetailsSkeletonLoader() {
  return (
    <Box marginBottom="xl" width="300px">
      <SkeletonLoader contentSize={2} headingSize={1} showImage={false} />
    </Box>
  );
}

export function SearchResultsSkeletonLoader() {
  let skeletonLoaders = [];
  const itemsCount = 6;
  for (var i = 0; i < itemsCount; i++) {
    skeletonLoaders.push(<SearchResultsCardSkeletonLoader key={i} />);
  }

  return <div>{skeletonLoaders}</div>;
}
