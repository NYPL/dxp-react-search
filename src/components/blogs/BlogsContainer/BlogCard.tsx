import React from "react";
// Components
import {
  ImageRatios,
  ImageSizes,
  CardLayouts,
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
        <div style={{ paddingBottom: ".5em" }}>
          <div>
            By {item.byline} | {item.date}
          </div>
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
      imageAspectRatio={ImageRatios.TwoByOne}
      imageSize={ImageSizes.Large}
    />
  );
}

export default BlogCard;
