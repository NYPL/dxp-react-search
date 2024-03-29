import * as React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { homePagePreviewQueryFilters } from "./../../../pages/home-preview";
// Components
import CardGrid from "./../../../components/home-v1/CardGrid";
import { SeeMore } from "../ComponentWrapper";
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export const HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY = gql`
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
          alt
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
  id?: string;
  title: string;
  link: string;
  variant: "row-grid" | "column-grid" | "updates-grid";
  seeMore: SeeMore;
}

export default function Spotlight({
  id,
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

  const { loading, error, data } = useQuery(
    HOME_PAGE_SPOTLIGHT_COLLECTION_QUERY,
    {
      variables: {
        ...(isTimeMachine
          ? {
              preview: true,
              filter: homePagePreviewQueryFilters(
                router.query.publish_on as string
              ),
            }
          : {
              filter: {
                experimental: true,
                conditions: [
                  {
                    operator: "=",
                    field: "status",
                    value: "true",
                  },
                ],
              },
            }),
        limit: 16,
        sort: {
          field: "field_is_weight",
          direction: "ASC",
        },
      },
    }
  );

  if (error) {
    return <div>Error while loading homepage spotlight items.</div>;
  }

  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  // Don't display the section if there's no items.
  if (data.homePageSpotlightCollection.items.length === 0) {
    return null;
  }

  return (
    <CardGrid
      id={id}
      title={title}
      link={link}
      variant={variant}
      hoverStyle={true}
      items={data.homePageSpotlightCollection.items}
      seeMore={seeMore}
    />
  );
}
