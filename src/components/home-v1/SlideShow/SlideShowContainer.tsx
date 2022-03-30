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
    <Box
      w="full"
      overflow={"hidden"}
      // position="relative"
    >
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
                mr={{ base: "15px", md: "20px", lg: "30px" }}
                w={{ base: "165.6px", md: "143px", lg: "191px", xl: "220px" }}
              >
                <Link>
                  <Image
                    src={item.image}
                    boxSize={{ md: "216px", xl: "220px" }}
                    fit="cover"
                  />
                  <Box
                    h={{ base: "130px", md: "150px", lg: "140px" }}
                    bg={"red.200"}
                    position="relative"
                    bottom={{ base: "20px", md: "65px", lg: "20px" }}
                    px="15px"
                    zIndex={1}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Heading
                      as="h3"
                      pt="15px"
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
                      mt="10px"
                      mb="5px"
                    >
                      <Text
                        fontSize="md"
                        mb={{ base: "5px", md: "15px" }}
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
