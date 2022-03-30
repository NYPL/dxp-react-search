import React from "react";
import { Box, Grid, GridItem, Heading, Link } from "@chakra-ui/react";

//use breakpouints md: 48em (768px) // lg: is in chakra 62em must be set to 64em (1024px)
interface ComponentWrapperProps {
  title: string;
  children: JSX.Element;
  textColor: string;
  borderColor?: string;
  buttonBorder?: string;
  bg?: string;
  paddingTop?: boolean;
}

function ComponentWrapper({
  title,
  children,
  textColor,
  borderColor,
  buttonBorder,
  bg,
  paddingTop,
}: ComponentWrapperProps) {
  return (
    <Box
      mb={8}
      bg={bg ? bg : ""}
      pl={{ base: 5, lg: 3 }}
      pr={{ base: 5, md: 10, lg: "30px" }}
      pt={{ base: 3.5, md: 5, xl: "30px" }}
      mx="calc(-50vw + 50%)"
    >
      <Grid
        m="auto"
        pl={{ base: 0.5, md: 5 }}
        maxWidth="1313px"
        templateAreas={{ md: `'heading component'` }}
        templateColumns={{ base: "1fr", md: "1fr 8fr" }}
        gap={{ base: 0, md: 3, lg: 1 }}
        overflow="hidden"
      >
        <GridItem gridArea={{ md: "heading" }}>
          <Box mr={{ base: "30px", md: "10px", lg: "20px", xl: "30px" }}>
            <Heading
              as="h2"
              size="md"
              color={textColor}
              fontWeight="bold"
              fontFamily="fonts.body"
              textAlign={{ base: "left", md: "right" }}
              pt={paddingTop === true ? 2 : 0}
              borderTop={`2px solid ${borderColor}`}
            >
              {title}
            </Heading>
          </Box>
        </GridItem>
        <GridItem
          gridArea={{ md: "component" }}
          mt={{ base: 3.5, md: "0px" }}
          mb="30px"
        >
          {children}
        </GridItem>
        <GridItem
          gridColumn={{ md: 2 }}
          gridRow={{ md: 3 }}
          h={{ base: "70px", md: "58px" }}
          w={{ base: "100vw", md: "90vw" }}
          maxWidth="1150px"
        >
          <Box w="100%" textAlign="center" mt={{ base: "10px", md: "0px" }}>
            <Link
              py={3.5}
              px="18px"
              color={textColor}
              textAlign="center"
              bg={bg ? bg : ""}
              border={`2px solid ${buttonBorder ? buttonBorder : borderColor}`}
              borderRadius="3xl"
            >
              ...SEE MORE
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ComponentWrapper;
