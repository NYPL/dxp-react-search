import React from "react";
// Components
import { Grid, GridItem, Image, Heading, Box } from "@chakra-ui/react";

interface CardProps {
  children?: JSX.Element;
  image: string;
  title?: string;
}

function Card({ children, image, title }: CardProps) {
  return (
    <Box as="li" listStyleType="none" py={3}>
      {title && (
        <Heading
          as="h2"
          my={2.5}
          fontFamily="Kievit-Medium"
          fontSize="lg"
          color="red.200"
          textTransform="uppercase"
        >
          {title}
        </Heading>
      )}
      <Grid templateColumns="1fr 2fr" gap={9}>
        <GridItem>
          <Image src={image} />
        </GridItem>
        <GridItem>{children}</GridItem>
      </Grid>
    </Box>
  );
}

export default Card;
