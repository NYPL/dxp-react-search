import React from "react";
import {
  Box,
  Grid,
  SkeletonLoader,
} from "@nypl/design-system-react-components";
import { getGridColumn } from "./CardGrid";

interface CardGridSkeletonLoaderProps {
  templateColumns: string;
  gap: string;
  itemsCount: number;
  cardLayout?: "column" | "row" | undefined;
  showImage?: boolean;
  contentSize?: number;
}

type CardSkeletonLoaderProps = Pick<
  CardGridSkeletonLoaderProps,
  "cardLayout" | "showImage" | "contentSize"
>;

function CardSkeletonLoader({
  cardLayout,
  showImage = true,
  contentSize,
}: CardSkeletonLoaderProps) {
  if (cardLayout === "column") {
    return (
      <SkeletonLoader imageAspectRatio="landscape" contentSize={contentSize} />
    );
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
                contentSize={contentSize}
              />
            </Box>
          </Box>
        )}
        <Box flexFlow={{ lg: "row nowrap" }} display="contents">
          <SkeletonLoader
            showHeading={true}
            showImage={false}
            contentSize={contentSize}
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
  contentSize = 4,
}: CardGridSkeletonLoaderProps) {
  const skeletonLoaders = [];

  for (let i = 0; i < itemsCount; i++) {
    const gridColumns = getGridColumn(itemsCount, cardLayout, i);

    skeletonLoaders.push(
      <Box as="li" key={i} gridColumn={{ md: gridColumns }}>
        <CardSkeletonLoader
          cardLayout={cardLayout}
          showImage={showImage}
          contentSize={contentSize}
        />
      </Box>
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
