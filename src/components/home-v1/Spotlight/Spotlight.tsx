import * as React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import CardGrid from "./../../../components/home-v1/CardGrid";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

const SPOTLIGHT_QUERY = gql`
  query ($filter: QueryFilter, $preview: Boolean, $sort: Sort, $limit: Int) {
    homePageSpotlightCollection(
      filter: $filter
      sort: $sort
      preview: $preview
      limit: $limit
    ) {
      items {
        id
        title
        image {
          id
          uri
          transformations {
            id
            uri
            label
          }
        }
        url
      }
    }
  }
`;

export interface SpotlightProps {
  title: string;
  link: string;
  variant: "row-grid" | "column-grid" | "updates-grid";
  seeMore: any;
}

export default function Spotlight({
  title,
  link,
  variant,
  seeMore,
}: SpotlightProps) {
  const router = useRouter();

  // Preview mode.
  const isPreview =
    router.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    router.query.uuid
      ? true
      : false;

  const isTimeMachine = isPreview && router.query.publish_on ? true : false;

  let queryFilters;
  if (isTimeMachine) {
    queryFilters = {
      experimental: true,
      conjunction: "OR",
      groups: [
        {
          conjunction: "AND",
          conditions: [
            {
              field: "status",
              operator: "=",
              value: "true",
            },
            {
              field: "publish_on",
              operator: "IS NULL",
            },
            {
              field: "unpublish_on",
              operator: "IS NULL",
            },
          ],
        },
        {
          conjunction: "AND",
          conditions: [
            {
              field: "publish_on",
              operator: "<=",
              value: router.query.publish_on,
            },
            {
              field: "unpublish_on",
              operator: ">=",
              value: router.query.publish_on,
            },
          ],
        },
      ],
    };
  }

  const { loading, error, data } = useQuery(SPOTLIGHT_QUERY, {
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: queryFilters,
      }),
      limit: 16,
      sort: {
        field: "field_is_weight",
        direction: "ASC",
      },
    },
  });

  if (error) {
    return <div>Error while loading homepage spotlight items.</div>;
  }

  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  return (
    <CardGrid
      title={title}
      link={link}
      variant={variant}
      hoverStyle={true}
      items={data.homePageSpotlightCollection.items}
      seeMore={seeMore}
    />
  );
}
