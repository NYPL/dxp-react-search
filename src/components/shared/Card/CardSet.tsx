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
  children: JSX.Element;
}

interface CardSetHeadingProps {
  id: string;
  title?: string;
  slug?: string;
}

function CardSetHeading({ id, title, slug }: CardSetHeadingProps) {
  if (slug && title) {
    return (
      <div style={{ marginBottom: ".75em" }}>
        {/*<h2 className="heading" id={id} style={{ display: "inline" }}>
          {title}
        </h2>
        */}
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
              See All
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

function CardSet({ id, title, description, slug, children }: CardSetProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {title && <CardSetHeading id={id} title={title} slug={slug} />}
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}

export default CardSet;
