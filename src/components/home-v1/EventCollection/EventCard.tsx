import * as React from "react";
import { useStyleConfig } from "@chakra-ui/system";
// Components
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import HomePageLink from "../HomePageLink";
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
  gaEventActionName: string;
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
  gaEventActionName,
}: EventCardProps) {
  const styles: any = useStyleConfig("Event", { variant, size });

  return (
    <Grid id={id} sx={styles}>
      <GridItem className="textBox">
        <Heading as="h3">
          <HomePageLink
            id={id}
            href={link}
            gaEventActionName={gaEventActionName}
          >
            {title}
          </HomePageLink>
        </Heading>
        <Box className="details">
          <Text as="span">{displayDate}</Text>
          <Text>{location}</Text>
        </Box>
      </GridItem>
      <GridItem colStart={1} rowStart={1}>
        <HomePageLink
          id={id}
          href={link}
          aria-label={`${title}-image`}
          tabIndex={-1}
          gaEventActionName={gaEventActionName}
        >
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
        </HomePageLink>
      </GridItem>
    </Grid>
  );
}
