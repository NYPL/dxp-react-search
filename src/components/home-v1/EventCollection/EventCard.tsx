import * as React from "react";
// Components
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import Image from "./../../shared/Image";

export interface EventCardProps {
  id: string;
  title: string;
  category: string;
  displayDate: string;
  location: string;
  image: any;
  link: string;
  featured: boolean;
  weight: number;
}

export default function EventCard({
  id,
  title,
  image,
  displayDate,
  link,
  location,
}: EventCardProps) {
  return (
    <Grid
      id={id}
      templateColumns={{ base: "4fr 9fr", md: "5fr 11fr", lg: "1fr 3fr" }}
      gridGap={{ base: 9, md: 6, lg: 4 }}
      mb={{ base: 0, lg: 7 }}
      textAlign="left"
    >
      <GridItem colStart={1} rowStart={1}>
        <a href={link}>
          {image && (
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
          )}
        </a>
      </GridItem>
      <GridItem className="textBox">
        <Heading
          as="h3"
          fontFamily="Kievit-Medium"
          fontSize={{ base: "lg", md: "xl" }}
        >
          <a href={link}>{title}</a>
        </Heading>
        <Box>{displayDate}</Box>
        <Box>{location}</Box>
      </GridItem>
    </Grid>
  );
}
