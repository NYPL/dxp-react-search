import React from "react";
// Next
import { useRouter } from "next/router";
import Error from "./../_error";
// Apollo
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "./../../apollo/client/withApollo";
// Component
import { Box } from "@chakra-ui/react";
import Meta from "./../../components/shared/Meta";
import Hero from "./../../components/home-v1/Hero";
import Slideshow from "../../components/home-v1/Slideshow/";
import StaffPicks from "../../components/home-v1/StaffPicks";
import FeaturedEvents from "../../components/home-v1/FeaturedEvents";
import CardGrid from "../../components/home-v1/CardGrid";
import ScoutHomepageV1Provider from "../../components/home-v1/theme";

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
} from "./../../components/home-v1/mockContent";
// Hooks
import useDecoupledRouter from "./../../hooks/useDecoupledRouter";

const HOMEPAGE_QUERY = gql`
  query ($id: String, $revisionId: String, $preview: Boolean) {
    homePage(id: $id, revisionId: $revisionId, preview: $preview) {
      id
      title
      slotOne {
        __typename
        ... on HpHero {
          id
          type
          heading
          description
          image {
            id
            uri
            transformations {
              label
              uri
            }
          }
        }
      }
    }
  }
`;

function HomePage() {
  const router = useRouter();

  const nextRouter = router;
  nextRouter.asPath = "/home2";

  const { isPreview, uuid } = useDecoupledRouter(nextRouter);

  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
        revisionId: router.query.revision_id,
      }),
    },
  });

  // If uuid returns null from useDecoupledRouter, there was no router
  // path match in Drupal, so we return 404 status error component.
  if (!data && uuid === null) {
    return <Error statusCode={404} />;
  }

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state.
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const homePageDataSlotOne = data.homePage.slotOne[0];

  return (
    <>
      <Meta title="homepage!" description="homepage desc!" />
      <Box className="scout__homepage">
        <ScoutHomepageV1Provider>
          <main id="main-content">
            <Box id="content-header" p={0} m={0}>
              <Hero
                title={homePageDataSlotOne.heading}
                description={homePageDataSlotOne.description}
                image={homePageDataSlotOne.image.uri}
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

//export default HomePage;

export default withApollo(HomePage, {
  ssr: true,
  redirects: false,
});
