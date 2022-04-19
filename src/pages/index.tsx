import React from "react";
// Component
import { Box } from "@chakra-ui/react";
import Meta from "./../components/shared/Meta";
import Hero from "./../components/home-v1/Hero";
import SlideShow from "../components/home-v1/SlideShow/SlideShow";
import StaffPicks from "../components/home-v1/StaffPicks/StaffPicks";
import FeaturedEvents from "../components/home-v1/FeaturedEvents/FeaturedEvents";
import CardGrid from "../components/home-v1/CardGrid/CardGrid";
import ScoutHomepageV1Provider from "../components/home-v1/theme";
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
              width="100%"
              maxWidth="1350px"
              margin="0 auto"
              padding="0 20px"
            >
              <CardGrid
                title={spotlightContent.title}
                link={spotlightContent.link}
                items={spotlightContent.items}
                hoverStyle={true}
                variant="column-grid"
              />
              <FeaturedEvents
                title={featuredEvents.title}
                link={featuredEvents.link}
                items={featuredEvents.items}
              />
              <CardGrid
                title={discoverContent.title}
                link={discoverContent.link}
                items={discoverContent.items}
                hoverStyle={true}
                variant="column-grid"
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
              <CardGrid
                title={blogContent.title}
                link={updatesContent.link}
                items={blogContent.items}
                hoverStyle={true}
                cardVariant="blog-card"
              />
              <CardGrid
                title={updatesContent.title}
                link={updatesContent.link}
                items={updatesContent.items}
                hoverStyle={true}
                variant="updates-grid"
                cardVariant="updates-card"
                size="sm"
              />
            </Box>
          </main>
        </ScoutHomepageV1Provider>
      </Box>
    </>
  );
}

export default HomePage;
