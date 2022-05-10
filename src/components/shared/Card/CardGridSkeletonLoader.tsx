import React from "react";
import {
  Box,
  Grid,
  SkeletonLoader,
} from "@nypl/design-system-react-components";

interface CardGridSkeletonLoaderProps {
  templateColumns: string;
  gap: string;
  itemsCount: number;
  cardLayout?: "column" | "row" | undefined;
  showImage?: boolean;
}

type CardSkeletonLoaderProps = Pick<
  CardGridSkeletonLoaderProps,
  "cardLayout" | "showImage"
>;

function CardSkeletonLoader({
  cardLayout,
  showImage = true,
}: CardSkeletonLoaderProps) {
  if (cardLayout === "column") {
    return <SkeletonLoader imageAspectRatio="landscape" />;
  } else if (cardLayout === "row") {
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
  cardLayout = "column",
  showImage = true,
}: CardGridSkeletonLoaderProps) {
  let skeletonLoaders = [];
  for (var i = 0; i < itemsCount; i++) {
    skeletonLoaders.push(
      <li key={i}>
        <CardSkeletonLoader cardLayout={cardLayout} showImage={showImage} />
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
