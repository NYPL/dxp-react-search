import * as React from "react";
import { Box, Grid, LayoutTypes } from "@nypl/design-system-react-components";
import Image from "./../../shared/Image";
import CardGridHeader from "./CardGridHeader";
import Card from "./Card";

export interface CardGridCommonProps {
  id: string;
  type: string;
  heading: string;
  headingColor?: string;
  description?: string;
  href?: string;
  hrefText?: string;
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
  image?: any;
  href: string;
}

export default function CardGrid({
  id,
  type,
  heading,
  headingColor,
  description,
  href,
  hrefText,
  layout,
  items,
  children,
}: CardGridProps) {
  let templateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
  if (layout === "row") {
    templateColumns = "repeat(1, 1fr)";
  }

  return (
    <Box id={`${type}-${id}`} mb="2em">
      {heading && (
        <CardGridHeader
          id={id}
          title={heading}
          headingColor={headingColor}
          href={href}
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
                href={item.href}
                layout={layout}
                image={
                  <Image
                    id={item.image.id}
                    alt={item.image.alt}
                    uri={item.image.uri}
                    useTransformation={true}
                    transformations={item.image.transformations}
                    transformationLabel={"2_1_960"}
                    layout="responsive"
                    width={item.image.width}
                    height={item.image.height}
                    quality={90}
                  />
                }
              />
            </li>
          ))}
        </Grid>
      )}
      {!items && children && <div>{children}</div>}
    </Box>
  );
}
