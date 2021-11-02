import React from "react";
// Components
import {
  SkeletonLoader,
  SkeletonLoaderImageRatios,
} from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";

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
    <CardGrid templateColumns={gridTemplateColumns} gap={gridGap}>
      {skeletonLoaders}
    </CardGrid>
  );
}

export default CardSkeletonLoader;
