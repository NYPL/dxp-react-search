import React from "react";
// Components
import {
  Card as DsCard,
  CardHeading,
  CardContent,
  CardImageRatios,
  CardImageSizes,
  CardLayouts,
  Heading,
  List,
} from "@nypl/design-system-react-components";
import Link from "next/link";
import Image from "./../Image";
import { CardType as CardProps } from "./CardTypes";

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
