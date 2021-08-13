import React from "react";
// Components
import { default as DsCard } from "./../../ds-prototypes/Card";
// Next components
import Link from "next/link";

interface CardProps {
  /** The id for the card */
  id: string;
  /** The image for the card */
  image?: JSX.Element;
  /** The name for the card */
  name: string;
  /** The description for the card */
  description: string;
  /** The url for the card */
  url: string;
}

function Card({ id, image, url, name, description }: CardProps) {
  return (
    <>
      <DsCard id={id}>
        {image && <>{image}</>}
        {url && (
          <h3 className={"heading"}>
            <Link href={url}>
              <a>{name}</a>
            </Link>
          </h3>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </DsCard>
    </>
  );
}

export default Card;
