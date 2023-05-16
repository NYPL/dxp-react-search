import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import CardGrid from "../CardGrid/CardGrid";
import CardGridSkeletonLoader from "../CardGrid/CardGridSkeletonLoader";

export const BLOGS_COLLECTION_QUERY = gql`
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
        link: slug
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
        # locations {
        #   id
        #   drupalInternalId
        #   name
        #   slug
        # }
      }
      pageInfo {
        totalItems
        limit
        pageCount
      }
    }
  }
`;

export interface BlogFeedProps {
  id: string;
  type: string;
  title: string;
  description?: string;
  channelId: string;
  headingColor?: string;
}

export default function BlogFeed({
  id,
  type,
  title,
  description,
  channelId,
  headingColor = "brand.black",
}: BlogFeedProps) {
  const link = `/blog/all?channel=${channelId}`;
  const linkText = "See all";

  const { loading, error, data } = useQuery(BLOGS_COLLECTION_QUERY, {
    skip: !channelId,
    variables: {
      limit: 4,
      pageNumber: 1,
      sort: { field: "created", direction: "DESC" },
      filter: {
        channels: {
          conjunction: "AND",
          fieldName: "field_erm_channels",
          operator: "=",
          value: [channelId],
        },
      },
      // @TODO this should be switched to use the newer filter syntax below, but that will req additional changes across app.
      // filter: {
      //   experimental: true,
      //   conditions: [
      //     {
      //       operator: "=",
      //       field: "field_erm_channels",
      //       value: "745",
      //     },
      //   ],
      // },
    },
  });

  if (error) {
    return <div>Error while loading blog posts.</div>;
  }

  if (loading) {
    return (
      <CardGrid
        id={id}
        type={type}
        title={title}
        link={link}
        linkTitle={linkText}
        headingColor={headingColor}
      >
        <CardGridSkeletonLoader
          templateColumns="repeat(12, 1fr)"
          gap="m"
          cardLayout="column"
          itemsCount={4}
          contentSize={1}
        />
      </CardGrid>
    );
  }

  return (
    <CardGrid
      id={id}
      type={type}
      layout="column"
      title={title}
      description={description}
      link={link}
      linkTitle={linkText}
      headingColor={headingColor}
      items={data.allBlogs.items}
    />
  );
}
