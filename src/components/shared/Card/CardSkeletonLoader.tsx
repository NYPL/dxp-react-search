import React from "react";
// Components
import {
  Grid,
  SkeletonLoader,
  SkeletonLoaderImageRatios,
} from "@nypl/design-system-react-components";

interface CardSkeletonLoaderProps {
  gridTemplateColumns: string;
  gridGap: string;
  itemsCount: number;
}

function CardSkeletonLoader({
  gridTemplateColumns,
  gridGap,
  itemsCount,
}: CardSkeletonLoaderProps) {
  let skeletonLoaders = [];
  for (var i = 0; i < itemsCount; i++) {
    skeletonLoaders.push(
      <SkeletonLoader imageAspectRatio={SkeletonLoaderImageRatios.Landscape} />
    );
  }

  return (
    <Grid gridTemplateColumns={gridTemplateColumns} gap={gridGap}>
      {skeletonLoaders}
    </Grid>
  );
}

export default CardSkeletonLoader;
