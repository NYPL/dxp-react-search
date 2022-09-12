import * as React from "react";
// Next
import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { homePagePreviewQueryFilters } from "./../../../pages/home-preview";
// Components
import Hero from "./Hero";
//
const { NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET } = process.env;

export const HOME_PAGE_HERO_COLLECTION_QUERY = gql`
  query ($filter: QueryFilter, $preview: Boolean) {
    homePageHeroCollection(filter: $filter, preview: $preview) {
      items {
        id
        heading
        description
        tag
        image {
          id
          uri
          width
          height
          transformations {
            id
            uri
            label
          }
        }
        published
        publishOn
        unpublishOn
      }
    }
  }
`;

export default function HeroWithData() {
  const router = useRouter();

  // Preview mode.
  const isPreview =
    router.query.preview_secret === NEXT_PUBLIC_DRUPAL_PREVIEW_SECRET &&
    router.query.uuid
      ? true
      : false;

  const isTimeMachine = isPreview && router.query.publish_on ? true : false;

  const { loading, error, data } = useQuery(HOME_PAGE_HERO_COLLECTION_QUERY, {
    variables: {
      ...(isTimeMachine && {
        preview: true,
        filter: homePagePreviewQueryFilters(router.query.publish_on as string),
      }),
    },
  });

  if (error) {
    return <div>Error while loading homepage hero collections.</div>;
  }

  if (loading || !data) {
    return <div>Loading ...</div>;
  }

  const homePageHero =
    data.homePageHeroCollection.items.length > 0
      ? data.homePageHeroCollection.items[0]
      : null;

  if (homePageHero) {
    return (
      <Hero
        title={homePageHero.heading}
        description={homePageHero.description}
        image={homePageHero.image}
        tag={homePageHero.tag}
        url={homePageHero.link}
      />
    );
  } else {
    return null;
  }
}
