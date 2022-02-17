import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { BLOG_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/blogFields";
// Components
import { Pagination } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import BlogCard from "./BlogCard";
import FilterBarDetails from "./FilterBarDetails";
// Types
import { BlogCardItem } from "./BlogCardTypes";
// Next
import { useRouter } from "next/router";

const BLOGS_QUERY = gql`
  ${BLOG_FIELDS_FRAGMENT}
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
        ...BlogFields
      }
      pageInfo {
        totalItems
        limit
        pageCount
      }
    }
  }
`;

interface BlogsContainerProps {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  slugLabel?: string;
  limit?: number;
  pageNumber?: number;
  sort?: any;
  featured?: boolean;
}

function BlogsContainer({
  id,
  title = "",
  description = "",
  slug = "",
  slugLabel = "",
  limit,
  pageNumber,
  sort,
  featured,
}: BlogsContainerProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;
  // Build query filters.
  let queryFilters: any = {};
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
          alpha: router.query.channel,
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
        <CardSkeletonLoader
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap="1.25rem"
          itemsCount={6}
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
        <div style={{ paddingBottom: "2rem" }}>
          <FilterBarDetails
            currentPage={currentPage}
            itemsOnPage={data.allBlogs.items.length}
            // @ts-ignore
            limit={limit}
            totalItems={data.allBlogs.pageInfo.totalItems}
          />
        </div>
      )}
      <CardSet
        id={id}
        title={title}
        slug={slug}
        slugLabel={slugLabel}
        description={description}
      >
        <CardGrid gap="2rem" templateColumns="repeat(1, 1fr)">
          {data.allBlogs.items.map((item: BlogCardItem) => (
            <li key={item.id}>
              <BlogCard item={item} />
            </li>
          ))}
        </CardGrid>
      </CardSet>
      {!featured && (
        <Pagination
          initialPage={currentPage}
          pageCount={data.allBlogs.pageInfo.pageCount}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default BlogsContainer;
