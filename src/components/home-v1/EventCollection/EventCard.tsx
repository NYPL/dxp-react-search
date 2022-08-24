import * as React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Box, Grid, GridItem, Heading, Link, Text } from "@chakra-ui/react";
import Image from "./../../shared/Image";

export interface EventCardProps {
  id: string;
  title: string;
  category: string;
  displayDate: string;
  location: string;
  image: any;
  link: string;
  weight: number;
  variant: string;
  size?: string;
}

export default function EventCard({
  id,
  title,
  image,
  displayDate,
  link,
  location,
  variant,
  size,
}: EventCardProps) {
  const styles: any = useStyleConfig("Event", { variant, size });
  return (
    <Grid id={id} sx={styles}>
      <GridItem className="textBox">
        <Heading as="h3">
          <Link href={link}>{title}</Link>
        </Heading>
        <Box className="details">
          <Text as="span">{displayDate}</Text>
          <Text>{location}</Text>
        </Box>
      </GridItem>
      <GridItem colStart={1} rowStart={1}>
        <Link href={link} aria-label={`${title}-image`} tabIndex={-1}>
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
        </Link>
      </GridItem>
    </Grid>
  );
}
