import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { PRESS_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/pressFields";
// Components
import { Box, Grid, Pagination } from "@nypl/design-system-react-components";
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import PressReleaseCard from "./PressReleaseCard";
/// Types
// import { PressCardItem } from "./BlogCardTypes";
// Next
import { useRouter } from "next/router";

const ALL_PRESS_RELEASES_QUERY = gql`
  ${PRESS_FIELDS_FRAGMENT}
  query AllPressReleases($limit: Int, $pageNumber: Int, $sort: Sort) {
    allPressReleases(limit: $limit, pageNumber: $pageNumber, sort: $sort) {
      items {
        ...PressFields
      }
      pageInfo {
        totalItems
        limit
        pageCount
      }
    }
  }
`;

interface PressReleaseContainerProps {
  id: string;
  description: string;
  limit: number;
  sort: any;
}

function PressReleaseContainer({
  id,
  description,
  limit,
  sort,
}: PressReleaseContainerProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;

  const { loading, error, data } = useQuery(ALL_PRESS_RELEASES_QUERY, {
    variables: {
      limit: limit ? limit : null,
      pageNumber: currentPage ? currentPage : 1,
      sort: sort ? sort : null,
    },
  });

  if (error) {
    return <Box>Error while loeading press releases.</Box>;
  }

  if (loading || !data) {
    return (
      <CardSkeletonLoader
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap="1.25rem"
        itemsCount={10}
      />
    );
  }
  return (
    <Box>
      <Grid>
        {data.allPressReleases.items &&
          data.allPressReleases.items.map((item: any) => (
            <PressReleaseCard item={item} />
          ))}
      </Grid>
      <Pagination
        initialPage={currentPage}
        pageCount={data.allPressReleases.pageInfo.pageCount}
        // onPageChange={onPageChange}
      />
    </Box>
  );
}
export default PressReleaseContainer;
