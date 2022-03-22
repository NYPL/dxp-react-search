import React from "react";
import {
  Box,
  Grid,
  SkeletonLoader,
  SkeletonLoaderImageRatios,
} from "@nypl/design-system-react-components";

interface CardGridSkeletonLoaderProps {
  templateColumns: string;
  gap: string;
  itemsCount: number;
  orientation?: "vertical" | "horizontal" | undefined;
  showImage?: boolean;
}

type CardSkeletonLoaderProps = Pick<
  CardGridSkeletonLoaderProps,
  "orientation" | "showImage"
>;

function CardSkeletonLoader({
  orientation,
  showImage = true,
}: CardSkeletonLoaderProps) {
  if (orientation === "vertical") {
    return (
      <SkeletonLoader imageAspectRatio={SkeletonLoaderImageRatios.Landscape} />
    );
  } else if (orientation === "horizontal") {
    return (
      <Box display={{ lg: "flex" }}>
        {showImage && (
          <Box
            flex={{ lg: "0 0 360px" }}
            mr={{ lg: "m" }}
            mb={{ base: "s", lg: 0 }}
          >
            <Box
              width="100%"
              height={{ base: "235px", md: "179px" }}
              overflow="hidden"
            >
              <SkeletonLoader
                showHeading={false}
                showContent={false}
                width="100%"
              />
            </Box>
          </Box>
        )}
        <Box flexFlow={{ lg: "row nowrap" }} display="contents">
          <SkeletonLoader
            showHeading={true}
            showImage={false}
            contentSize={4}
          />
        </Box>
      </Box>
    );
  } else {
    return null;
  }
}

export default function CardGridSkeletonLoader({
  templateColumns,
  gap,
  itemsCount,
  orientation = "vertical",
  showImage = true,
}: CardGridSkeletonLoaderProps) {
  let skeletonLoaders = [];
  for (var i = 0; i < itemsCount; i++) {
    skeletonLoaders.push(
      <li key={i}>
        <CardSkeletonLoader orientation={orientation} showImage={showImage} />
      </li>
    );
  }

  return (
    <Grid
      as="ul"
      listStyleType="none"
      templateColumns={templateColumns}
      gap={gap}
    >
      {skeletonLoaders}
    </Grid>
  );
}
