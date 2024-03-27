import React from "react";
import {
  Box,
  Card as DsCard,
  CardContent,
  CardHeading,
  LayoutTypes,
  Link,
} from "@nypl/design-system-react-components";

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
        },
      })}
      isCentered={isCentered}
      layout={layout}
    >
      <CardHeading level="h3" size="heading5" sx={{ a: { textDecor: "none" } }}>
        {/* @note This is a temporary fix until the imperva WAF is more stable
          and stops blocking nextjs client side routing. */}
        {url && <Link href={url}>{title}</Link>}
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
