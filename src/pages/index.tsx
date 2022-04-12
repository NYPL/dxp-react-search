import React from "react";
import { Box } from "@chakra-ui/react";
import Meta from "./../components/shared/Meta";
import Hero from "./../components/home-v1/Hero";
import CardGrid from "./../components/home-v1/CardGrid";
import SlideShow from "../components/home-v1/SlideShow/SlideShow";
import StaffPicks from "../components/home-v1/StaffPicks/StaffPicks";
import FeaturedEvents from "../components/home-v1/FeaturedEvents/FeaturedEvents";
import LinkCardGrid from "../components/home-v1/LinkCardGrid";
import Updates from "../components/home-v1/Updates";
import ScoutHomepageV1Provider from "../components/home-v1/theme";
// Type
import { Variant } from "../components/home-v1/LinkCard";
// Mock content
import {
  heroContent,
  spotlightContent,
  featuredEvents,
  discoverContent,
  staffPicks,
  slideShowContent,
  blogContent,
  updatesContent,
} from "./../components/home-v1/mockContent";

function HomePage() {
  return (
    <>
      <Meta title="homepage!" description="homepage desc!" />
      <Box className="scout__homepage">
        <ScoutHomepageV1Provider>
          <main id="main-content">
            <Box id="content-header">
              <Hero
                title={heroContent.title}
                description={heroContent.description}
                image={heroContent.image}
                tag={heroContent.tag}
              />
            </Box>
            <Box
              id="content-primary"
              maxWidth="1350px"
              width="100%"
              margin="0 auto"
              padding="0 20px"
            >
              <LinkCardGrid
                title={spotlightContent.title}
                link={spotlightContent.link}
                items={spotlightContent.items}
                hoverStyle={true}
              />
              {/* <CardGrid
                title={spotlightContent.title}
                link={spotlightContent.link}
                items={spotlightContent.items}
              /> */}
              <FeaturedEvents
                title={featuredEvents.title}
                link={featuredEvents.link}
                items={featuredEvents.items}
              />
              <LinkCardGrid
                title={discoverContent.title}
                link={discoverContent.link}
                items={discoverContent.items}
                hoverStyle={true}
              />
              <StaffPicks
                title={staffPicks.title}
                link={staffPicks.link}
                items={staffPicks.items}
              />
              <SlideShow
                title={slideShowContent.title}
                link={slideShowContent.link}
                items={slideShowContent.items}
              />
              <LinkCardGrid
                title={blogContent.title}
                link={updatesContent.link}
                items={blogContent.items}
                templateColumns={{
                  base: "1fr 2fr",
                  md: "12fr 13fr",
                  lg: "5fr 9fr",
                  xl: "9fr 10fr",
                }}
                layout="row"
                gap={{ base: 6, xl: 12 }}
                variant={Variant.BlogCard}
                hoverStyle={true}
              />
              <Updates
                title={updatesContent.title}
                link={updatesContent.link}
                items={updatesContent.items}
              />
            </Box>
          </main>
        </ScoutHomepageV1Provider>
      </Box>
    </>
  );
}

export default HomePage;
