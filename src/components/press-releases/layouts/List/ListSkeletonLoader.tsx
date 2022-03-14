import React from "react";
//Comonents
import { SkeletonLoader, Grid } from "@nypl/design-system-react-components";

interface ListSkeletonLoaderProps {
  itemsCount: number;
  showHeading?: boolean;
  showImage?: boolean;
  border?: boolean;
}

function ListSkeletonLoader({
  itemsCount,
  showHeading = true,
  showImage = false,
  border = false,
}: ListSkeletonLoaderProps) {
  let skeletonLoaders = [];
  for (let i = 0; i < itemsCount; i++) {
    skeletonLoaders.push(
      <SkeletonLoader
        showHeading={showHeading}
        showImage={showImage}
        border={border}
      />
    );
  }
  return <Grid>{skeletonLoaders}</Grid>;
}

export default ListSkeletonLoader;
