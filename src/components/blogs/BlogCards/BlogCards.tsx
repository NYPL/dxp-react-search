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
  query BlogsQuery($contentType: String, $limit: Int, $pageNumber: Int) {
    allBlogs(
      contentType: $contentType
      limit: $limit
      pageNumber: $pageNumber
    ) {
      items {
        id
        title
        description
        slug
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
  image: ImageType;
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
              subHeading={<div>By NYPL Media | January 12, 2021</div>}
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
