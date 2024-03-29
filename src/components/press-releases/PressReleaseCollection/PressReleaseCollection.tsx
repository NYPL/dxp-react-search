import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import { Box, Grid, Pagination } from "@nypl/design-system-react-components";
import CardGridSkeletonLoader from "../../shared/Card/CardGridSkeletonLoader";
import PressReleaseCard from "./PressReleaseCard";
// Type
import { PressReleaseItem } from "./PressReleaseCardType";
// Next
import { useRouter } from "next/router";

export const ALL_PRESS_RELEASES_QUERY = gql`
  query AllPressReleases(
    $limit: Int
    $pageNumber: Int
    $sort: Sort
    $filter: PressFilter
  ) {
    allPressReleases(
      limit: $limit
      pageNumber: $pageNumber
      sort: $sort
      filter: $filter
    ) {
      items {
        id
        title
        subTitle
        description
        slug
        date
      }
      pageInfo {
        totalItems
        limit
        pageCount
      }
    }
  }
`;

interface PressReleaseCollectionProps {
  id: string;
  limit: number;
  sort: any;
  status: boolean;
}

function PressReleaseCollection({
  id,
  limit,
  sort,
  status,
}: PressReleaseCollectionProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;

  const { loading, error, data } = useQuery(ALL_PRESS_RELEASES_QUERY, {
    variables: {
      limit: limit ? limit : null,
      pageNumber: currentPage ? currentPage : 1,
      sort: sort ? sort : null,
      filter: { status: { fieldName: "status", operator: "=", value: status } },
    },
  });

  function onPageChange(pageIndex: number) {
    router.push({ query: { page: pageIndex } });
  }

  if (error) {
    return <Box>Error while loading press releases.</Box>;
  }

  if (loading || !data) {
    return (
      <CardGridSkeletonLoader
        gap="l"
        templateColumns="repeat(1, 1fr)"
        itemsCount={10}
        showImage={false}
        cardLayout="row"
      />
    );
  }

  return (
    <Box id={id}>
      <Grid as="ul" listStyleType="none">
        {data.allPressReleases.items &&
          data.allPressReleases.items.map((item: PressReleaseItem) => (
            <li key={item.id}>
              <PressReleaseCard item={item} />
            </li>
          ))}
      </Grid>
      <Box
        sx={{
          // Centers the pagination component.
          "& nav[role=navigation]": {
            justifyContent: "center",
            marginY: "xl",
          },
        }}
      >
        <Pagination
          initialPage={currentPage}
          pageCount={data.allPressReleases.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}
export default PressReleaseCollection;
