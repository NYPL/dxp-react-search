import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { PRESS_FIELDS_FRAGMENT } from "../../../apollo/client/fragments/pressFields";
// Components
import { Box, Grid, Pagination } from "@nypl/design-system-react-components";
import MediaContacts from "../layouts/MediaContacts";
import ListSkeletonLoader from "../layouts/List/ListSkeletonLoader";
import PressReleaseCard from "./PressReleaseCard";
//Type
import { PressReleaseItem } from "./PressReleaseCardType";
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

interface PressReleaseCollectionProps {
  id: string;
  description: string;
  mediaContacts: string;
  limit: number;
  sort: any;
}

function PressReleaseCollection({
  id,
  description,
  mediaContacts,
  limit,
  sort,
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
    },
  });

  function onPageChange(pageIndex: number) {
    router.push({ query: { page: pageIndex } });
  }

  if (error) {
    return <Box>Error while loading press releases.</Box>;
  }

  if (loading || !data) {
    return <ListSkeletonLoader itemsCount={10} />;
  }

  return (
    <Box>
      <Box mb={"l"}>{description}</Box>
      <Grid>
        {data.allPressReleases.items &&
          data.allPressReleases.items.map((item: PressReleaseItem) => (
            <PressReleaseCard item={item} />
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
      <MediaContacts mediaContacts={mediaContacts} />
    </Box>
  );
}
export default PressReleaseCollection;
