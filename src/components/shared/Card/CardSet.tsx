import React from "react";
// Components
import {
  Icon,
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
        <h2 className="heading" id={id} style={{ display: "inline" }}>
          {title}
        </h2>
        <Link href={slug}>
          <a
            style={{
              display: "inline-flex",
              flexFlow: "row nowrap",
              lineHeight: "1",
              fontSize: ".875rem",
              fontWeight: 600,
              letterSpacing: ".04em",
              color: "red",
              marginLeft: "10px",
              textDecoration: "none",
            }}
          >
            See All
            <span style={{ marginLeft: "5px" }}>
              <Icon
                size={IconSizes.small}
                name={IconNames.arrow}
                decorative={true}
                iconRotation={IconRotationTypes.rotate270}
              />
            </span>
          </a>
        </Link>
      </div>
    );
  } else if (title) {
    return (
      <h2 className="heading" id={id}>
        {title}
      </h2>
    );
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
