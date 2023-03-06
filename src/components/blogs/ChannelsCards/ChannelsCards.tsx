import React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { IMAGE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/image";
import { TERM_BASE_FIELDS_FRAGMENT } from "./../../../apollo/client/fragments/term";
// Components
import Card from "../../shared/Card";
import CardSet from "../../shared/Card/CardSet";
import CardGridSkeletonLoader from "../../shared/Card/CardGridSkeletonLoader";
import Image from "../../shared/Image";
import { Grid } from "@nypl/design-system-react-components";
// Types
import { ImageType } from "../../shared/Image/ImageTypes";
// Utils
import { BLOGS_BASE_PATH } from "./../../../utils/config";

interface ChannelsCardsProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  slugLabel?: string;
  limit?: number;
  sort?: any;
  featured?: boolean;
}

interface ChannelCardItem {
  id: string;
  tid: string;
  title: string;
  description: string;
  slug: string;
  image: ImageType;
}

export const CHANNELS_QUERY = gql`
  ${TERM_BASE_FIELDS_FRAGMENT}
  ${IMAGE_FIELDS_FRAGMENT}
  query ChannelsQuery(
    $vocabulary: String
    $sort: Sort
    $limit: Int
    $filter: TermQueryFilter
  ) {
    allTermsByVocab(
      vocabulary: $vocabulary
      sort: $sort
      limit: $limit
      filter: $filter
    ) {
      ...TermBaseFields
      ...ImageFields
      slug
    }
  }
`;

function ChannelsCards({
  id,
  title,
  description,
  slug,
  slugLabel,
  limit,
  sort,
  featured,
}: ChannelsCardsProps) {
  const queryFilters: any = {};
  if (featured) {
    queryFilters["featured"] = {
      fieldName: "field_bs_featured",
      operator: "=",
      value: featured,
    };
  }

  // Query for data.
  const { loading, error, data } = useQuery(CHANNELS_QUERY, {
    variables: {
      vocabulary: "channel",
      sort: sort ? sort : null,
      limit: limit ? limit : null,
      featured: featured ? featured : null,
      filter: queryFilters,
    },
  });

  // Error state.
  if (error) {
    return <div>Error while loading channels.</div>;
  }

  // Loading state.
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
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="m"
          itemsCount={6}
        />
      </CardSet>
    );
  }

  return (
    <CardSet
      id={id}
      title={title}
      slug={slug}
      slugLabel={slugLabel}
      description={description}
    >
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="m"
      >
        {data.allTermsByVocab.map((item: ChannelCardItem) => (
          <li key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              description={item.description}
              url={`${BLOGS_BASE_PATH}/all?channel=${item.tid}`}
              // @TODO Remove this after the channel term field for image is required.
              {...(item.image && {
                image: (
                  <Image
                    id={item.image.id}
                    alt={item.image.alt}
                    uri={item.image.uri}
                    useTransformation={true}
                    transformations={item.image.transformations}
                    transformationLabel={"2_1_960"}
                    layout="responsive"
                    width={900}
                    height={450}
                    quality={90}
                  />
                ),
              })}
            />
          </li>
        ))}
      </Grid>
    </CardSet>
  );
}

export default ChannelsCards;
