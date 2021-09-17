import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
// Components
import { Pagination } from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import CardSet from "../../shared/Card/CardSet";
import CardSkeletonLoader from "../../shared/Card/CardSkeletonLoader";
import BlogCard from "./BlogCard";

// Types
import { ImageType } from "../../shared/Image/ImageTypes";
// Next
import { useRouter } from "next/router";

const BLOGS_QUERY = gql`
  query BlogsQuery(
    $contentType: String
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
      contentType: $contentType
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
        id
        title
        description
        slug
        date
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
  // @ts-ignore
  const currentPage = router.query.page ? parseInt(router.query.page) : 1;

  const { loading, error, data } = useQuery(BLOGS_QUERY, {
    variables: {
      contentType: "blog",
      limit: limit ? limit : null,
      pageNumber: currentPage ? currentPage : 1,
      featured: featured ? featured : null,
      sortBy: sortBy ? sortBy : null,
      // @ts-ignore
      channels: router.query.channel ? router.query.channel.split(" ") : null,
      // @ts-ignore
      subjects: router.query.subject ? router.query.subject.split(" ") : null,
      // @ts-ignore
      libraries: router.query.library ? router.query.library.split(" ") : null,
      // @ts-ignore
      divisions: router.query.division
        ? // @ts-ignore
          router.query.division.split(" ")
        : null,
    },
  });

  function onPageChange(pageIndex: any) {
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

  return (
    <>
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
        // @ts-ignore
        currentPage={currentPage}
        pageCount={data.allBlogs.pageInfo.pageCount}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default BlogsContainer;
