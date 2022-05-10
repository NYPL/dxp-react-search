import React from "react";
import {
  Box,
  Card as DsCard,
  CardContent,
  CardHeading,
  LayoutTypes,
} from "@nypl/design-system-react-components";
import NextDsLink from "./../Link/NextDsLink";

interface CardProps {
  /** The id for the card. */
  id: string;
  /** The heading text for the card's h3. */
  title: string;
  /** The sub heading component for the card. */
  subHeading?: JSX.Element;
  /** The description for the card. */
  description?: string;
  /** The url for the card. */
  url: string;
  /** An optional image component that can be passed to the card. */
  image?: JSX.Element;
  /** Optional value to render the layout in a row or column. */
  layout?: LayoutTypes;
  /** Optional value to control the alignment of the text and elements. */
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
      isCentered={isCentered}
      layout={layout}
    >
      <CardHeading level="three">
        {url && <NextDsLink href={url}>{title}</NextDsLink>}
      </CardHeading>
      <CardContent>
        {subHeading && subHeading}
        {description && (
          <Box
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></Box>
        )}
      </CardContent>
    </DsCard>
  );
}

export default Card;
