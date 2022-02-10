import React from "react";
// Components
import {
  Box,
  ImageSizes,
  CardLayouts,
  Link,
  HStack,
} from "@nypl/design-system-react-components";
import Card from "../../shared/Card";
import Image from "../../shared/Image";
// Types
import { ImageType } from "../../shared/Image/ImageTypes";

interface BlogCardProps {
  item: BlogCardItem;
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

function BlogCard({ item }: BlogCardProps) {
  return (
    <Card
      id={item.id}
      title={item.title}
      subHeading={
        <Box pb={5}>
          <Box>
            By {item.byline} | {item.date}
          </Box>
          {item.locations && (
            <HStack>
              {item.locations.map((location: Location) => {
                return <Link href={location.slug}>{location.name}</Link>;
              })}
            </HStack>
          )}
        </Box>
      }
      description={item.description}
      url={item.slug}
      layout={CardLayouts.Row}
      center
      image={
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
      }
      imageSize={ImageSizes.Large}
    />
  );
}

export default BlogCard;
