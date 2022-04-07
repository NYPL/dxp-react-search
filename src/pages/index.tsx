import React from "react";
import { Box } from "@chakra-ui/react";
import Meta from "./../components/shared/Meta";
import Hero from "./../components/home-v1/Hero";
import CardGrid from "./../components/home-v1/CardGrid";
import SlideShow from "../components/home-v1/SlideShow/SlideShow";
import StaffPicks from "../components/home-v1/StaffPicks/StaffPicks";
import FeaturedEvents from "../components/home-v1/FeaturedEvents/FeaturedEvents";
import ScoutHomepageV1Provider from "../components/home-v1/theme";
// Mock content
import {
  heroContent,
  spotlightContent,
  featuredEvents,
  staffPicks,
  slideShowContent,
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
              <CardGrid
                title={spotlightContent.title}
                items={spotlightContent.items}
              />
              <FeaturedEvents
                title={featuredEvents.title}
                items={featuredEvents.items}
              />
              <StaffPicks title={staffPicks.title} items={staffPicks.items} />
              <SlideShow
                title={slideShowContent.title}
                items={slideShowContent.items}
              />
            </Box>
          </main>
        </ScoutHomepageV1Provider>
      </Box>
    </>
  );
}

export default HomePage;
