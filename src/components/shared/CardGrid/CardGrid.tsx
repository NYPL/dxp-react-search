import * as React from "react";
import { Box, Grid, LayoutTypes } from "@nypl/design-system-react-components";
import Image from "./../../shared/Image";
import { ImageType } from "../Image/ImageTypes";
import CardGridHeader from "./CardGridHeader";
import Card from "./Card";

export interface CardGridCommonProps {
  id: string;
  type: string;
  title: string;
  headingColor?: string;
  description?: string;
  link?: string;
  hrefText?: string;
  isBordered?: boolean;
}

type CardGridConditionalProps =
  | {
      items?: CardItem[];
      layout?: LayoutTypes;
      children?: never;
    }
  | {
      children?: React.ReactNode;
      items?: never;
      layout?: never;
    };

type CardGridProps = CardGridCommonProps & CardGridConditionalProps;

export interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: ImageType;
  link: string;
}

export default function CardGrid({
  id,
  type,
  title,
  headingColor,
  description,
  link,
  hrefText,
  layout,
  isBordered = false,
  items,
  children,
}: CardGridProps) {
  let templateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
  let isBorderedFinal = isBordered;
  if (layout === "row") {
    templateColumns = "repeat(1, 1fr)";
    isBorderedFinal = true;
  }

  return (
    <Box id={`${type}-${id}`} mb="2em">
      {title && (
        <CardGridHeader
          id={id}
          title={title}
          headingColor={headingColor}
          link={link}
          hrefText={hrefText}
        />
      )}
      {description && <p>{description}</p>}
      {items && (
        <Grid
          as="ul"
          listStyleType="none"
          templateColumns={templateColumns}
          gap="m"
        >
          {items.map((item: CardItem) => (
            <li key={item.id}>
              <Card
                id={item.id}
                heading={item.title}
                description={item.description}
                href={item.link}
                layout={layout}
                isBordered={isBorderedFinal}
                {...(item.image && {
                  image: (
                    <Image
                      id={item.image.id}
                      alt={item.image.alt}
                      uri={item.image.uri}
                      useTransformation={true}
                      transformations={item.image.transformations}
                      transformationLabel={"2_1_960"}
                      layout="responsive"
                      // width={item.image.width}
                      // height={item.image.height}
                      width={900}
                      height={450}
                      quality={90}
                    />
                  ),
                })}
              />
            </li>
          ))}
        </Grid>
      )}
      {!items && children && <div>{children}</div>}
    </Box>
  );
}
