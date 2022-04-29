import React from "react";
// Components
import {
  Card as DsCard,
  CardContent,
  CardHeading,
  // ImageRatios,
  // ImageSizes,
  LayoutTypes,
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
  layout?: LayoutTypes;
  isCentered?: boolean;
}

function Card({
  id,
  image,
  url,
  title,
  subHeading,
  description,
  isCentered,
  layout,
}: CardProps) {
  return (
    <DsCard
      id={id}
      {...(image && {
        imageProps: {
          component: image,
          // Workaround to suppress console.warn message for component and aspect ratio.
          aspectRatio: "square",
        },
      })}
      {...(isCentered && {
        isCentered: true,
      })}
      {...(layout && {
        layout: layout,
      })}
      // {...(imageSize && {
      //   imageSize: imageSize,
      // })}
    >
      <CardHeading level="three">
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
