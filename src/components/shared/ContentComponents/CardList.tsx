import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  Card,
  CardContent,
  CardHeading,
  ImageSizes,
  CardLayouts,
  Grid,
  Link,
} from "@nypl/design-system-react-components";
import Image from "../../shared/Image";

interface CardListProps {
  id: string;
  type: string;
  heading?: string;
  description?: string;
  items: CardItem[];
}

interface CardItem {
  id: string;
  title: string;
  description: string;
  image: any;
  link: string;
}

function CardList({ id, type, heading, description, items }: CardListProps) {
  return (
    <Box id={`${type}-${id}`} mb="xl">
      {heading && <Heading level={HeadingLevels.Two} text={heading} />}
      {description && <Box dangerouslySetInnerHTML={{ __html: description }} />}
      <Grid
        as="ul"
        gap="l"
        templateColumns="repeat(1, 1fr)"
        sx={{ listStyleType: "none" }}
      >
        {items.map((item: CardItem) => {
          return (
            <li key={item.id}>
              <Card
                layout={CardLayouts.Row}
                center
                imageComponent={
                  <a href={item.link}>
                    <Image
                      id={item.image.id}
                      alt={item.image.alt}
                      uri={item.image.uri}
                      useTransformation={true}
                      transformations={item.image.transformations}
                      transformationLabel={"1_1_960"}
                      layout="responsive"
                      width={960}
                      height={960}
                      quality={90}
                    />
                  </a>
                }
                imageSize={ImageSizes.Small}
              >
                <CardHeading level={HeadingLevels.Three}>
                  <Link href={item.link}> {item.title}</Link>
                </CardHeading>
                <CardContent>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></Box>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CardList;
