import React from "react";
import { Box, Grid, GridItem, Heading, Link } from "@chakra-ui/react";

interface ComponentWrapperProps {
  title: string;
  children: JSX.Element;
  textColor: string;
  borderColor?: string;
  buttonBorder?: string;
  bg?: string;
  paddingTop?: boolean;
  alignSectionHeading?: string;
}

function ComponentWrapper({
  title,
  children,
  textColor,
  borderColor,
  buttonBorder,
  bg,
  paddingTop,
  alignSectionHeading,
}: ComponentWrapperProps) {
  return (
    <Box
      bg={bg ? bg : ""}
      pt={{ base: 3, lg: 4, xl: 8 }}
      pl={{ base: 5, md: 9, lg: 5, xl: 7 }}
      pr={{ base: 5, md: 10, lg: 7 }}
      mx="calc(-50vw + 50%)"
    >
      <Grid
        m="auto"
        maxWidth="1313px"
        templateAreas={{ md: `'heading component'` }}
        templateColumns={{ base: "1fr", md: "88px 8fr", lg: "120px 8fr" }}
        gap={{ base: 0, md: 6, xl: 7 }}
        overflow="hidden"
      >
        <GridItem gridArea={{ md: "heading" }}>
          <Box
            mt={{
              base: "",
              lg: `${alignSectionHeading ? alignSectionHeading : ""}`,
            }}
          >
            <Heading
              as="h2"
              size="md"
              variant="section-title"
              color={textColor}
              pt={paddingTop === true ? { base: 4, md: 2 } : 0}
              borderTopColor={`${borderColor ? borderColor : ""}`}
            >
              {title}
            </Heading>
          </Box>
        </GridItem>
        <GridItem
          gridArea={{ md: "component" }}
          mt={{ base: 3, md: 0 }}
          mb={{ base: 5, md: 0 }}
        >
          {children}
        </GridItem>
        <GridItem
          gridColumn={{ md: 2 }}
          gridRow={{ md: 3 }}
          h={{ base: "70px", md: "48px" }}
          w={{ base: "100vw", md: "90vw" }}
          maxW="6xl"
        >
          <Box
            maxWidth={{ md: "75vw", lg: "82vw", xl: "85vw" }}
            textAlign="center"
            mt={{ base: 6, md: -3 }}
          >
            <Link
              variant="see-more"
              color={textColor}
              border="2px"
              borderColor={buttonBorder || borderColor}
              borderStyle="solid"
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
