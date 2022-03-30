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
      borderColor="red"
      paddingTop={true}
    >
      <Grid
        as="ul"
        listStyleType="none"
        templateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(267px, 1fr))",
        }}
        w="full"
        gap={6}
      >
        {items.map((item: CardGridItem) => (
          <li key={item.id}>
            <Box display={"flex"} flexDirection={{ base: "row", md: "column" }}>
              <Box w={{ base: "30vw", md: "100%" }}>
                <img width="100%" height="auto" src={item.image} />
              </Box>
              <Heading
                as="h3"
                size="md"
                w={{ base: "60vw", md: "auto" }}
                fontWeight="bold"
                fontFamily="Kievit-Book"
                my={2}
                mx={{ base: "5vw", md: "0px" }}
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
