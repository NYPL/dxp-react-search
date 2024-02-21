import React from "react";
// Components
import {
  HStack,
  // Icon,
  Link as DsLink,
} from "@nypl/design-system-react-components";
import Heading from "../Heading";
import Link from "next/link";

interface CardSetProps {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  slugLabel?: string;
  children: JSX.Element;
}

interface CardSetHeadingProps {
  id: string;
  title?: string;
  slug?: string;
  slugLabel?: string;
}

function CardSetHeading({ id, title, slug, slugLabel }: CardSetHeadingProps) {
  if (slug && slugLabel && title) {
    return (
      <div style={{ marginBottom: ".75em" }}>
        <HStack alignItems="baseline">
          <Heading id={id} level="h2">
            {title}
          </Heading>
          <Link href={slug} passHref>
            <DsLink type="standalone" color="#c60917">
              {slugLabel}
            </DsLink>
          </Link>
        </HStack>
      </div>
    );
  } else if (title) {
    return (
      <Heading id={id} level="h2">
        {title}
      </Heading>
    );
  } else {
    return null;
  }
}

function CardSet({
  id,
  title,
  description,
  slug,
  slugLabel,
  children,
}: CardSetProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {title && (
        <CardSetHeading
          id={id}
          title={title}
          slug={slug}
          slugLabel={slugLabel}
        />
      )}
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}

export default CardSet;
