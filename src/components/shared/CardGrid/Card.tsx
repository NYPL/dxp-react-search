import * as React from "react";
import {
  Box,
  Card as DsCard,
  CardContent,
  CardHeading,
  LayoutTypes,
  Link,
} from "@nypl/design-system-react-components";

export interface CardProps {
  /** The id for the card. */
  id: string;
  /** The heading text for the card's h3. */
  heading: string;
  /** The sub heading component for the card. */
  subHeading?: JSX.Element;
  /** The description for the card. */
  description?: string;
  /** The url for the card. */
  href: string;
  /** An optional image component that can be passed to the card. */
  image?: JSX.Element;
  /** Optional value to render the layout in a row or column. */
  layout?: LayoutTypes;
  /** Optional value to control the alignment of the text and elements. */
  isCentered?: boolean;
  /** Optional value to control the border. */
  isBordered?: boolean;
}

export default function Card({
  id,
  heading,
  subHeading,
  description,
  href,
  image,
  layout,
  isCentered,
  isBordered = false,
}: CardProps) {
  let imagePropsFinal = {};

  if (layout === "row") {
    imagePropsFinal = {
      // Workaround to suppress console.warn message for component and aspect ratio.
      aspectRatio: "square",
      size: "large",
    };
  } else {
    imagePropsFinal = {
      aspectRatio: "square",
    };
  }

  return (
    <DsCard
      id={id}
      {...(image && {
        imageProps: {
          component: image,
          ...imagePropsFinal,
        },
      })}
      isCentered={isCentered}
      layout={layout}
      isBordered={isBordered}
    >
      <CardHeading level="three">
        {href && <Link href={href}>{heading}</Link>}
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
