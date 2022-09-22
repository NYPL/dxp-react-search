import React from "react";
// Component
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import HomePageLink from "./../HomePageLink";

interface ComponentWrapperProps {
  id?: string;
  title: string;
  link: string;
  seeMore?: SeeMore;
  alignSectionHeading?: string;
  hoverStyle?: boolean;
  paddingTop?: boolean;
  textColor: string;
  borderColor?: string;
  buttonBorder?: string;
  bg?: string;
  gap?: any;
  children: JSX.Element;
}

export type SeeMore = {
  link: string;
  text: string;
};

function ComponentWrapper({
  id,
  title,
  link,
  seeMore,
  alignSectionHeading,
  hoverStyle = false,
  paddingTop,
  textColor,
  borderColor,
  buttonBorder,
  bg,
  gap,
  children,
}: ComponentWrapperProps) {
  // @TODO fix for styling of seeMore button
  const seeMoreStyle = {
    color: textColor,
    border: "2px",
    borderColor: buttonBorder || borderColor,
    borderStyle: "solid",
    textTransform: "uppercase",
  };

  return (
    <Box
      bg={bg ? bg : ""}
      // Original pt={3} for ref
      pt={{ base: 2, lg: 3, xl: 6 }}
      pl={{ base: 2, md: 8, lg: 4, xl: 6 }}
      pr={{ base: 4, md: 9, lg: 6 }}
      mx="calc(-50vw + 50%)"
    >
      <Grid
        m="auto"
        maxWidth="1313px"
        p={1}
        templateAreas={{ md: "'heading component'" }}
        templateColumns={{
          base: "1fr",
          md: "1fr 7fr",
          lg: "2fr 19fr",
        }}
        gridColumnGap={gap ? gap : { base: 0, md: 5, xl: 7 }}
        gridRowGap={{ base: 0, md: 2, xl: 3 }}
        overflow="hidden"
      >
        <GridItem
          gridArea={{ md: "heading" }}
          w={{ base: "full", md: "110px", lg: "121px" }}
        >
          <Box
            mt={{
              base: 0,
              lg: `${alignSectionHeading ? alignSectionHeading : ""}`,
            }}
          >
            <Heading
              as="h2"
              id={`component-wrapper-heading-${id}`}
              size="md"
              variant="section-title"
              color={textColor}
              pt={paddingTop === true ? { base: 4, md: 2 } : 0}
              borderTopColor={`${borderColor ? borderColor : ""}`}
            >
              <HomePageLink
                id={`component-wrapper-heading-link-${id}`}
                href={link}
                gaEventActionName="Heading"
                variant={
                  hoverStyle === true
                    ? "link-hover-style"
                    : "link-hover-no-style"
                }
              >
                {title}
              </HomePageLink>
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
        <GridItem gridColumn={{ md: 2 }} gridRow={{ md: 3 }} maxW="6xl">
          <Box
            maxWidth={{ base: "90vw", md: "75vw", lg: "90vw", xl: "85vw" }}
            textAlign="center"
            mt={{ base: 6 }}
            mb={{ base: 7, md: 10, lg: 8 }}
          >
            {seeMore && (
              <HomePageLink
                id={`component-wrapper-seeMore-link-${id}`}
                aria-label={`see more of ${title}`}
                href={seeMore.link}
                gaEventActionName="See More"
                variant={
                  hoverStyle === true
                    ? "see-more-hover-style"
                    : "see-more-hover-no-style"
                }
                {...seeMoreStyle}
              >
                {seeMore.text}
              </HomePageLink>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ComponentWrapper;
