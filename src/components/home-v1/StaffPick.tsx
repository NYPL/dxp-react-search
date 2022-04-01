import React from "react";

// Component
import ComponentWrapper from "./ComponentWrapper";
import { Grid, GridItem, Box, Text, Image, Link } from "@chakra-ui/react";

interface StaffPicksProps {
  title: string;
  items: StaffPicksItem[];
}

type StaffPicksItem = {
  id: string;
  quote: string;
  image: string;
  author: string;
  location: string;
};

function StaffPick({ title, items }: StaffPicksProps) {
  return (
    <ComponentWrapper
      title={title}
      textColor={"brand.100"}
      borderColor={"brand.100"}
      buttonBorder={"white"}
      bg={"red.200"}
      paddingTop={true}
    >
      <Grid
        as="ul"
        maxWidth={{ md: "75vw", lg: "82vw", xl: "85vw" }}
        listStyleType="none"
        templateColumns={{
          base: " 1fr",
          md: "repeat(auto-fit, minmax(267px, 1fr))",
        }}
        gap={{ md: 7, lg: 8, xl: 10 }}
      >
        {items &&
          items.map((item) => (
            <GridItem as="li">
              <Box
                h={{ md: "200px", lg: "264px", xl: "374px" }}
                position="relative"
              >
                {" "}
                <Box
                  bg="brand.100"
                  zIndex={0}
                  height="100%"
                  w="auto"
                  mr={{ md: "55px", lg: "75px", xl: "105px" }}
                  _after={{
                    content: "''",
                    position: "absolute",
                    bottom: "-20px",
                    left: "30px",
                    borderRightWidth: "20px",
                    borderTopWidth: "20px",
                    borderStyle: "solid",
                    borderBottomColor: "brand.100",
                    borderTopColor: "brand.100",
                    borderRightColor: "transparent",
                    borderLeftColor: "transparent",

                    display: "block",
                    width: "0px",
                  }}
                ></Box>
                <Text
                  pl={{ md: "15px", xl: "30px" }}
                  pr={{ md: "120px", lg: "157px", xl: "220px" }}
                  position="absolute"
                  bottom="13%"
                  fontFamily="Milo-Regular"
                  fontStyle="italic"
                  lineHeight="none"
                  fontSize={{ md: "20px", lg: "27px", xl: "35px" }}
                  textAlign="left"
                >
                  {item.quote}
                </Text>
                <Link
                  display="inline-block"
                  float="right"
                  position="absolute"
                  bottom="0px"
                  right="0px"
                >
                  <Image
                    src={item.image}
                    zIndex={1}
                    maxHeight={{ md: "175px", lg: "233px", xl: "320px" }}
                    maxWidth={{ md: "115px", lg: "153px", xl: "212px" }}
                  />
                </Link>
              </Box>
              <Box
                color="brand.100"
                mt={{ md: "15px", xl: "20px" }}
                fontWeight="bold"
                fontFamily="Kievit-Book"
              >
                <Text
                  pt={{ md: "20px", xl: "34px" }}
                  pb="4px"
                  fontSize={{ md: "18px", lg: "16px", xl: "20px" }}
                >
                  {item.author}
                </Text>
                <Text fontSize="15px">{item.location}</Text>
              </Box>
            </GridItem>
          ))}
      </Grid>
    </ComponentWrapper>
  );
}

export default StaffPick;
