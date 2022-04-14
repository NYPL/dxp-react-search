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
  children,
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
        templateColumns={{
          base: "1fr",
          md: "1fr 7fr",
          lg: "2fr 19fr",
        }}
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
            mt={{ base: 6, md: -3, lg: -8 }}
            mb={{ base: 10, lg: 8 }}
          >
            <Link
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
