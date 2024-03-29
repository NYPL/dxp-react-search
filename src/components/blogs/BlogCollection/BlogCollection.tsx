import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import { Box, Grid, Pagination } from "@nypl/design-system-react-components";
import CardSet from "../../shared/Card/CardSet";
import CardGridSkeletonLoader from "../../shared/Card/CardGridSkeletonLoader";
import BlogCard from "./BlogCard";
import FilterBarDetails from "./FilterBarDetails";
// Types
import { BlogCardItem } from "./BlogCardTypes";
// Next
import { useRouter } from "next/router";

export const BLOGS_QUERY = gql`
  query BlogsQuery(
    $limit: Int
    $pageNumber: Int
    $sort: Sort
    $filter: BlogFilter
  ) {
    allBlogs(
      limit: $limit
      pageNumber: $pageNumber
      filter: $filter
      sort: $sort
    ) {
      items {
        id
        title
        description
        slug
        date
        byline
        image {
          id
          uri
          alt
          transformations {
            id
            label
            uri
          }
        }
        locations {
          id
          drupalInternalId
          name
          slug
        }
      }
      pageInfo {
        totalItems
        limit
        pageCount
      }
    }
  }
`;

interface BlogCollectionProps {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  slugLabel?: string;
  limit: number;
  pageNumber?: number;
  sort?: any;
  featured?: boolean;
  status?: boolean;
}

function BlogCollection({
  id,
  title = "",
  description = "",
  slug = "",
  slugLabel = "",
  limit,
  sort,
  featured,
  status,
}: BlogCollectionProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;
  // Build query filters.
  const queryFilters: any = {};
  const queryFiltersArray = [
    {
      queryName: "channel",
      filterName: "channels",
      fieldName: "field_erm_channels",
    },
    {
      queryName: "subject",
      filterName: "subjects",
      fieldName: "field_erm_subjects",
    },
    {
      queryName: "library",
      filterName: "libraries",
      fieldName: "field_erm_location",
    },
    {
      queryName: "division",
      filterName: "divisions",
      fieldName: "field_erm_divisions",
    },
    {
      queryName: "audience_by_age",
      filterName: "audiences",
      fieldName: "field_erm_audience",
    },
  ];
  queryFiltersArray.forEach((queryFilter) => {
    if (router.query[queryFilter.queryName]) {
      queryFilters[queryFilter.filterName] = {
        fieldName: queryFilter.fieldName,
        operator: "=",
        value: (router.query[queryFilter.queryName] as string).split(" "),
        conjunction: "AND",
      };
    }
  });
  if (featured) {
    queryFilters["featured"] = {
      fieldName: "field_bs_featured",
      operator: "=",
      value: featured,
    };
  }
  // Published
  if (status) {
    queryFilters["status"] = {
      fieldName: "status",
      operator: "=",
      value: status,
    };
  }

  const { loading, error, data } = useQuery(BLOGS_QUERY, {
    variables: {
      limit: limit ? limit : null,
      pageNumber: currentPage ? currentPage : 1,
      sort: sort ? sort : null,
      filter: queryFilters,
    },
  });

  function onPageChange(pageIndex: number) {
    router.push({
      query: {
        // @TODO do this better.
        ...(router.query.channel && {
          channel: router.query.channel,
        }),
        ...(router.query.subject && {
          subject: router.query.subject,
        }),
        ...(router.query.library && {
          library: router.query.library,
        }),
        ...(router.query.division && {
          division: router.query.division,
        }),
        ...(router.query.audience_by_age && {
          audience_by_age: router.query.audience_by_age,
        }),
        page: pageIndex,
      },
    });
  }

  if (error) {
    return <div>Error while loading featured posts.</div>;
  }

  if (loading || !data) {
    return (
      <CardSet
        id={id}
        title={title}
        slug={slug}
        slugLabel={slugLabel}
        description={description}
      >
        <CardGridSkeletonLoader
          templateColumns="repeat(1, 1fr)"
          gap="l"
          cardLayout="row"
          showImage={true}
          itemsCount={5}
        />
      </CardSet>
    );
  }

  // Check for specific query parameters from url to set filter display status.
  const showFilterBar = [
    "channel",
    "subject",
    "library",
    "division",
    "audience_by_age",
  ].some((item) => router.query.hasOwnProperty(item));

  return (
    <>
      {showFilterBar && (
        <Box pb="l">
          <FilterBarDetails
            currentPage={currentPage}
            itemsOnPage={data.allBlogs.items.length}
            limit={limit}
            totalItems={data.allBlogs.pageInfo.totalItems}
          />
        </Box>
      )}
      <CardSet
        id={id}
        title={title}
        slug={slug}
        slugLabel={slugLabel}
        description={description}
      >
        <Grid
          as="ul"
          gap="l"
          templateColumns="repeat(1, 1fr)"
          listStyleType="none"
          data-testid="blog-collection"
        >
          {data.allBlogs.items.map((item: BlogCardItem) => (
            <li key={item.id}>
              <BlogCard item={item} />
            </li>
          ))}
        </Grid>
      </CardSet>
      {!featured && (
        <Box
          sx={{
            // Centers the pagination component.
            "& nav[role=navigation]": {
              justifyContent: "center",
            },
          }}
          data-testid="blog-pagination"
        >
          <Pagination
            initialPage={currentPage}
            pageCount={data.allBlogs.pageInfo.pageCount}
            onPageChange={onPageChange}
          />
        </Box>
      )}
    </>
  );
}

export default BlogCollection;
