import React from "react";
// Components
import {
  Card as DsCard,
  CardContent,
  CardHeading,
  CardImageRatios,
  CardImageSizes,
  CardLayouts,
} from "@nypl/design-system-react-components";
import Link from "next/link";

interface CardProps {
  /** The id for the card */
  id: string;
  /** The name for the card */
  title: string;
  subHeading?: JSX.Element;
  /** The description for the card */
  description?: string;
  /** The url for the card */
  url: string;
  /** The image for the card */
  // @TODO this should be the type for NextJS image.
  image?: JSX.Element;
  /** */
  imageAspectRatio?: CardImageRatios;
  layout?: CardLayouts;
  center?: boolean;
  imageSize?: CardImageSizes;
}

function Card({
  id,
  image,
  url,
  title,
  subHeading,
  description,
  imageAspectRatio,
  center,
  layout,
  imageSize,
}: CardProps) {
  return (
    <DsCard
      id={id}
      {...(image && {
        imageComponent: image,
      })}
      {...(image &&
        imageAspectRatio && {
          imageAspectRatio: imageAspectRatio,
        })}
      {...(center && {
        center: true,
      })}
      {...(layout && {
        layout: layout,
      })}
      {...(imageSize && {
        imageSize: imageSize,
      })}
    >
      <CardHeading level={3}>
        {url && (
          <Link href={url}>
            <a>{title}</a>
          </Link>
        )}
      </CardHeading>
      <CardContent>
        {subHeading && subHeading}
        {description && (
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        )}
      </CardContent>
    </DsCard>
  );
}

export default Card;
