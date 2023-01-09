import * as React from "react";
import { Box } from "@nypl/design-system-react-components";
import Image from "./../../shared/Image";
import { ImageType } from "../Image/ImageTypes";
import Card from "./Card";

export interface CardGridItemProps {
  item: CardItem;
  cardLayout: "row" | "column";
  gridColumn?: string;
  isBordered?: boolean;
  isCentered?: boolean;
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: ImageType;
  link: string;
}

export default function CardGridItem({
  item,
  cardLayout,
  gridColumn,
  isBordered = false,
  isCentered = false,
}: CardGridItemProps) {
  const { id, title, description, link, image } = item;

  return (
    <Box as="li" key={id} gridColumn={{ lg: gridColumn }}>
      <Card
        id={id}
        heading={title}
        description={description}
        href={link}
        layout={cardLayout}
        isBordered={isBordered}
        isCentered={isCentered}
        {...(image && {
          image: (
            <Image
              id={image.id}
              alt={image.alt}
              uri={image.uri}
              useTransformation={true}
              transformations={image.transformations}
              transformationLabel={"2_1_960"}
              layout="responsive"
              width={900}
              height={450}
              quality={90}
            />
          ),
        })}
      />
    </Box>
  );
}
