import React from "react";
// Components
import { Box, Image, Heading, Text, Grid, Link } from "@chakra-ui/react";
import ComponentWrapper from "../ComponentWrapper";
// Types
import { SlideShowItem } from "./SlideShowTypes";

interface SlideShowContainerProps {
  items: SlideShowItem[];
  slideShowStyle: Record<string, string>;
}
function SlideShowContainer({
  items,
  slideShowStyle,
}: SlideShowContainerProps) {
  return (
    <Box w="full" overflow={"hidden"}>
      <Grid
        as="ul"
        w="full"
        h={{ base: "310px", md: "300px", lg: "340px" }}
        listStyleType="none"
        templateColumns="repeat(10, 1fr)"
        gap={0}
        ml={slideShowStyle.marginLeft}
        transition={slideShowStyle.transition}
      >
        {items &&
          items.map((item: SlideShowItem) => {
            return (
              <Box
                as="li"
                bg="red.200"
                h="full"
                mr={{ base: 4, md: 5, lg: "33px" }}
                w={{ base: "165.6px", md: "143px", lg: "193px", xl: "212px" }}
              >
                <Link _hover={{ textDecoration: "none" }} href={item.url}>
                  <Image
                    src={item.image}
                    boxSize={{ base: "216px", xl: "220px" }}
                    fit="cover"
                    objectPosition={"15% 0%"}
                  />
                  <Box
                    h={{ base: "130px", md: "150px", lg: "140px" }}
                    w="full"
                    bg={"red.200"}
                    position="relative"
                    bottom={{ base: 9, md: 16, lg: 5 }}
                    px={4}
                    zIndex={1}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Heading
                      as="h3"
                      pt={4}
                      fontFamily="Kievit-Book"
                      color="brand.100"
                      fontSize={{
                        base: "18px",
                        md: "18px",
                        lg: "20px",
                        xl: "22px",
                      }}
                      lineHeight="none"
                    >
                      {item.title}
                    </Heading>
                    <Box
                      color="brand.100"
                      fontFamily="Kievit-Book"
                      mt={2.5}
                      mb={1.5}
                    >
                      <Text
                        fontSize="md"
                        mb={{ base: 1.5, md: 4 }}
                        fontWeight="semibold"
                        lineHeight="none"
                      >
                        {item.author}
                      </Text>
                      <Text fontSize="xs" textTransform="uppercase">
                        {item.audience}
                      </Text>
                      <Text fontSize="xs" textTransform="uppercase">
                        {item.genre}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              </Box>
            );
          })}
      </Grid>
    </Box>
  );
}
export default SlideShowContainer;
