import React from "react";
// Components
import {
  Heading,
  HeadingLevels,
  HStack,
  Icon,
  IconColors,
  IconNames,
  IconRotationTypes,
  IconSizes,
} from "@nypl/design-system-react-components";
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
          <Heading id={id} level={HeadingLevels.Two} text={title} />
          <Link href={slug}>
            <a
              style={{
                display: "inline-flex",
                flexFlow: "row nowrap",
                lineHeight: "1",
                fontSize: ".875rem",
                fontWeight: 600,
                letterSpacing: ".04em",
                color: "#c60917",
                marginLeft: "10px",
                textDecoration: "none",
              }}
            >
              {slugLabel}
              <span style={{ marginLeft: "5px" }}>
                <Icon
                  size={IconSizes.Small}
                  name={IconNames.Arrow}
                  decorative={true}
                  iconRotation={IconRotationTypes.Rotate270}
                  color={IconColors.BrandPrimary}
                />
              </span>
            </a>
          </Link>
        </HStack>
      </div>
    );
  } else if (title) {
    return <Heading id={id} level={HeadingLevels.Two} text={title} />;
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
