import React from "react";
import {
  Box,
  Heading,
  HeadingLevels,
  Card,
  CardContent,
  CardHeading,
  ImageRatios,
  ImageSizes,
  CardLayouts,
  Grid,
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
                  <Box
                    w="100%"
                    //
                    maxWidth={["100%", "100%", "225px", "165px"]}
                    mr={[null, null, "m"]}
                    mb={["m", null]}
                  >
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
                  </Box>
                }
                imageAspectRatio={ImageRatios.Original}
                //imageAspectRatio={ImageRatios.Square}
                //imageSize={ImageSizes.Small}
              >
                <CardHeading level={HeadingLevels.Three}>
                  {item.title}
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
