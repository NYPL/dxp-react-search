import React from "react";
// Components
import {
  Card as DsCard,
  CardContent,
  CardHeading,
  ImageRatios,
  ImageSizes,
  CardLayouts,
} from "@nypl/design-system-react-components";
import NextDsLink from "./../Link/NextDsLink";

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
  imageAspectRatio?: ImageRatios;
  layout?: CardLayouts;
  center?: boolean;
  imageSize?: ImageSizes;
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
        {url && <NextDsLink href={url}>{title}</NextDsLink>}
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
