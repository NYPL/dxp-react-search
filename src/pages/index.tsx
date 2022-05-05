import React from "react";
// Component
import { Box } from "@chakra-ui/react";
import Meta from "./../components/shared/Meta";
import Hero from "./../components/home-v1/Hero";
import Slideshow from "../components/home-v1/Slideshow/";
import StaffPicks from "../components/home-v1/StaffPicks";
import FeaturedEvents from "../components/home-v1/FeaturedEvents";
import CardGrid from "../components/home-v1/CardGrid";
import ScoutHomepageV1Provider from "../components/home-v1/theme";
// Mock content
import {
  heroContent,
  spotlightContent,
  featuredEvents,
  discoverContent,
  staffPicks,
  slideshowContent,
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
            <Box id="content-header" p={0} m={0}>
              <Hero
                title={heroContent.title}
                description={heroContent.description}
                image={heroContent.image}
                mobileImg={heroContent.mobileImg}
                tag={heroContent.tag}
                url={heroContent.url}
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
              <Slideshow
                title={slideshowContent.title}
                link={slideshowContent.link}
                items={slideshowContent.items}
              />
              <CardGrid
                title={blogContent.title}
                link={updatesContent.link}
                items={blogContent.items}
                hoverStyle={true}
                variant="row-grid"
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
