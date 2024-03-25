import * as React from "react";
import {
  Box,
  Grid,
  Heading,
  HorizontalRule,
} from "@nypl/design-system-react-components";
import Card from "./../CardGrid/Card";
import TextFormatted from "./../../shared/TextFormatted";
import Image from "./../../shared/Image";
import { ImageType } from "../Image/ImageTypes";

export interface RelatedContentItem {
  id: string;
  title: string;
  description: string;
  image?: ImageType;
  link: string;
}

export interface RelatedContentProps {
  id: string;
  title: string;
  description?: string;
  items?: RelatedContentItem[];
}

export default function RelatedContent({
  id,
  title,
  description,
  items,
}: RelatedContentProps) {
  return (
    <Box id={id}>
      <HorizontalRule marginBottom="xl" marginTop="0" />
      <Heading id={id} level="h3">
        {title}
      </Heading>
      {description && <TextFormatted html={description} />}
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns={{ md: "repeat(12, 1fr)" }}
        gap="m"
      >
        {items &&
          items.map((item: RelatedContentItem) => {
            const { id, title, description, link, image } = item;
            return (
              <Box as="li" key={id} gridColumn="auto / span 4">
                <Card
                  id={id}
                  heading={title}
                  description={description}
                  href={link}
                  layout="column"
                  isBordered={true}
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
          })}
      </Grid>
    </Box>
  );
}
