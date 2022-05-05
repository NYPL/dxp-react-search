import React from "react";
import { Box, Grid, GridItem, Heading, Link } from "@chakra-ui/react";

interface ComponentWrapperProps {
  title: string;
  link: string;
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

function ComponentWrapper({
  title,
  link,
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
        templateAreas={{ md: `'heading component'` }}
        templateColumns={{
          base: "1fr",
          md: "1fr 7fr",
          lg: "2fr 19fr",
        }}
        gridColumnGap={gap ? gap : { base: 0, md: 5, xl: 7 }}
        gridRowGap={{ base: 0, md: 2, xl: 3 }}
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
              <Link
                href={link}
                variant={
                  hoverStyle === true
                    ? "link-hover-style"
                    : "link-hover-no-style"
                }
              >
                {title}
              </Link>
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
            mb={{ base: 10, lg: 8 }}
          >
            <Link
              aria-label={`see more of ${title}`}
              href={link}
              variant={
                hoverStyle === true
                  ? "see-more-hover-style"
                  : "see-more-hover-no-style"
              }
              color={textColor}
              border="2px"
              borderColor={buttonBorder || borderColor}
              borderStyle="solid"
            >
              SEE MORE...
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ComponentWrapper;
