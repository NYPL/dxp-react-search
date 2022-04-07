import React from "react";
import { Grid, Heading, Box } from "@chakra-ui/react";
import ComponentWrapper from "./ComponentWrapper";

interface CardGridProps {
  title: string;
  items: CardGridItem[];
}

interface CardGridItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

function CardGrid({ title, items }: CardGridProps) {
  return (
    <ComponentWrapper
      title={title}
      textColor="red.200"
      borderColor="red.200"
      paddingTop={true}
    >
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(267px, 1fr))",
        }}
        gap={{ base: 9, md: 6 }}
      >
        {items.map((item: CardGridItem) => (
          <li key={item.id}>
            <Box display={"flex"} flexDirection={{ base: "row", md: "column" }}>
              <Box w={{ base: "31vw", md: "100%" }}>
                <img width="100%" height="auto" src={item.image} />
              </Box>
              <Heading
                as="h3"
                size="md"
                w={{ base: "60vw", md: "auto" }}
                fontWeight="normal"
                fontFamily="Kievit-Book"
                fontSize={{ base: "lg", md: "xl" }}
                mt={4}
                mx="5%"
              >
                {item.title}
              </Heading>
            </Box>
          </li>
        ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default CardGrid;
