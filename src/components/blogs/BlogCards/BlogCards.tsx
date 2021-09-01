import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
// Components
import {
  CardImageRatios,
  CardImageSizes,
  CardLayouts,
  Heading,
} from "@nypl/design-system-react-components";
import CardGrid from "../../ds-prototypes/CardGrid";
import Card from "../../shared/Card";
import Image from "../../shared/Image";
// Types
import { ImageType } from "../../shared/Image/ImageTypes";

const BLOGS_QUERY = gql`
  query BlogsQuery(
    $contentType: String
    $limit: Int
    $pageNumber: Int
    $featured: Boolean
    $sortBy: String
  ) {
    allBlogs(
      contentType: $contentType
      limit: $limit
      pageNumber: $pageNumber
      filter: { featured: $featured }
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
  title?: string;
  description?: string;
  limit?: number;
  pageNumber?: number;
  sortBy?: string;
  featured?: boolean;
}

// @TODO this should be a shared type,
// You should also stop using slug and use url? or urlPath?
interface CardItem {
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

function BlogCards({
  title,
  description,
  limit,
  pageNumber,
  sortBy,
  featured,
}: BlogCardsProps) {
  const { loading, error, data } = useQuery(BLOGS_QUERY, {
    variables: {
      contentType: "blog",
      limit: limit ? limit : null,
      pageNumber: pageNumber ? pageNumber : 1,
      featured: featured ? featured : null,
      sortBy: sortBy ? sortBy : null,
    },
  });

  if (error) {
    return <div>Error while loading featured posts.</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      {title && <Heading id="featured-posts" level={2} text={title} />}
      {description && <p>{description}</p>}
      <CardGrid gap="2rem" templateColumns="repeat(1, 1fr)">
        {data.allBlogs.items.map((item: CardItem) => (
          <li key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              subHeading={
                <div style={{ paddingBottom: ".5em" }}>
                  <div>By NYPL Media | {item.date}</div>
                  {item.locations.map((location: Location) => {
                    return (
                      <a style={{ paddingRight: "10px" }} href={location.slug}>
                        {location.name}
                      </a>
                    );
                  })}
                  &nbsp;
                </div>
              }
              description={item.description}
              url={item.slug}
              layout={CardLayouts.Horizontal}
              center
              image={
                <Image
                  id={item.image.id}
                  alt={item.image.alt}
                  uri={item.image.uri}
                  useTransformation={true}
                  transformations={item.image.transformations}
                  transformationLabel={"medium"}
                  // @TODO fix this, s3 bug? this image transformation doesnt work?
                  //transformationLabel={"2_1_960"}
                  layout="responsive"
                  width={900}
                  height={450}
                  quality={90}
                />
              }
              imageAspectRatio={CardImageRatios.TwoByOne}
              imageSize={CardImageSizes.Large}
            />
          </li>
        ))}
      </CardGrid>
    </div>
  );
}

export default BlogCards;
