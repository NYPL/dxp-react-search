import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { BLOG_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/blogFields";
// Components
import { Pagination } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import BlogCard from "./BlogCard";
import FilterBarDetails from "./FilterBarDetails";
// Types
import { ImageType } from "../../shared/Image/ImageTypes";
// Next
import { useRouter } from "next/router";

const BLOGS_QUERY = gql`
  ${BLOG_FIELDS_FRAGMENT}
  query BlogsQuery(
    $limit: Int
    $pageNumber: Int
    $featured: Boolean
    $sortBy: String
    $channels: [String]
    $subjects: [String]
    $libraries: [String]
    $divisions: [String]
  ) {
    allBlogs(
      limit: $limit
      pageNumber: $pageNumber
      filter: {
        featured: $featured
        channels: $channels
        subjects: $subjects
        libraries: $libraries
        divisions: $divisions
      }
      sortBy: $sortBy
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

interface BlogCardsProps {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  limit?: number;
  pageNumber?: number;
  sortBy?: string;
  featured?: boolean;
}

// @TODO this should be a shared type,
// You should also stop using slug and use url? or urlPath?
interface BlogCardItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  byline: string;
  date: string;
  locations: Location[];
  image: ImageType;
}

interface Location {
  id: string;
  name: string;
  slug: string;
}

function BlogsContainer({
  id,
  title = "",
  description = "",
  slug = "",
  limit,
  pageNumber,
  sortBy,
  featured,
}: BlogCardsProps) {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string, 10)
    : 1;

  const { loading, error, data } = useQuery(BLOGS_QUERY, {
    variables: {
      limit: limit ? limit : null,
      pageNumber: currentPage ? currentPage : 1,
      featured: featured ? featured : null,
      sortBy: sortBy ? sortBy : null,
      channels: router.query.channel
        ? (router.query.channel as string).split(" ")
        : null,
      subjects: router.query.subject
        ? (router.query.subject as string).split(" ")
        : null,
      libraries: router.query.library
        ? (router.query.library as string).split(" ")
        : null,
      divisions: router.query.division
        ? (router.query.division as string).split(" ")
        : null,
    },
  });

  function onPageChange(pageIndex: number) {
    router.push({
      query: {
        page: pageIndex,
      },
    });
  }

  if (error) {
    return <div>Error while loading featured posts.</div>;
  }

  if (loading || !data) {
    return (
      <CardSet id={id} title={title} slug={slug} description={description}>
        <CardSkeletonLoader
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap="1.25rem"
          itemsCount={6}
        />
      </CardSet>
    );
  }

  // Check for specific query parameters from url to set filter display status.
  const showFilterBar = ["channel", "subject", "library", "division"].some(
    (item) => router.query.hasOwnProperty(item)
  );

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
      <CardSet id={id} title={title} slug={slug} description={description}>
        <CardGrid gap="2rem" templateColumns="repeat(1, 1fr)">
          {data.allBlogs.items.map((item: BlogCardItem) => (
            <li key={item.id}>
              <BlogCard item={item} />
            </li>
          ))}
        </CardGrid>
      </CardSet>
      <Pagination
        // @TODO Confirm that this is working.
        initialPage={currentPage}
        pageCount={data.allBlogs.pageInfo.pageCount}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default BlogsContainer;
