import * as React from "react";
import { Box, Grid } from "@nypl/design-system-react-components";
import Image from "./../../shared/Image";
import { ImageType } from "../Image/ImageTypes";
import CardGridHeader from "./CardGridHeader";
import Card from "./Card";

export type CardGridLayoutTypes = "row" | "column" | "column_4" | "column_2_4";

export interface CardGridCommonProps {
  id: string;
  type: string;
  title?: string;
  headingColor?: string;
  description?: string;
  link?: string;
  hrefText?: string;
  isBordered?: boolean;
  isCentered?: boolean;
}

type CardGridConditionalProps =
  | {
      items?: CardItem[];
      layout?: CardGridLayoutTypes;
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
  isCentered = false,
  items,
  children,
}: CardGridProps) {
  // Set a final layout value for the DS card.
  const finalLayout = layout === "row" ? "row" : "column";

  // Logic for template columns based on layout.
  let templateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
  if (layout === "column_4") {
    templateColumns = "repeat(auto-fit, minmax(294px, 1fr))";
  }
  if (layout === "column_2_4") {
    templateColumns = "repeat(12, 1fr)";
  }

  // Logic for template row based on layout.
  let isBorderedFinal = isBordered;
  let isCenteredFinal = isCentered;
  if (layout === "row") {
    templateColumns = "repeat(1, 1fr)";
    isBorderedFinal = true;
    isCenteredFinal = true;
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
          templateColumns={{ lg: templateColumns }}
          gap="m"
        >
          {items.map((item: CardItem, index) => {
            let gridColumnSpan;
            // @TODO maybe add a check for 5 or 6 items and then only add this?
            if (layout === "column_2_4") {
              gridColumnSpan = index > 1 ? "span 3" : "span 6";
            }

            return (
              <Box as="li" key={item.id} gridColumn={{ lg: gridColumnSpan }}>
                <Card
                  id={item.id}
                  heading={item.title}
                  description={item.description}
                  href={item.link}
                  layout={finalLayout}
                  isBordered={isBorderedFinal}
                  isCentered={isCenteredFinal}
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
              </Box>
            );
          })}
        </Grid>
      )}
      {!items && children && <div>{children}</div>}
    </Box>
  );
}
