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
// import Hero from "./../../components/home-v1/Hero";
import HeroWithData from "./../../components/home-v1/Hero/HeroWithData";
// import Slideshow from "../../components/home-v1/Slideshow/";
import StaffPicks from "../../components/home-v1/StaffPicks";
import EventCollection from "../../components/home-v1/EventCollection";
import CardGrid from "../../components/home-v1/CardGrid";

import Spotlight from "../../components/home-v1/Spotlight";
import ScoutHomepageV1Provider from "../../components/home-v1/theme";

// Mock content
// import {
//   spotlightContent,
//   discoverContent,
//   staffPicks,
//   slideshowContent,
//   blogContent,
//   updatesContent,
// } from "./../../components/home-v1/mockContent";
// Hooks
import useDecoupledRouter from "./../../hooks/useDecoupledRouter";

export const HOMEPAGE_QUERY = gql`
  query ($id: String, $revisionId: String, $preview: Boolean) {
    homePage(id: $id, revisionId: $revisionId, preview: $preview) {
      id
      title
      sectionTwo {
        __typename
        ... on HomePageSpotlightComponent {
          id
          type
          heading
          link
          gridVariant
          seeMore {
            text
            link
          }
        }
      }
      sectionThree {
        __typename
        ... on HomePageEventsComponent {
          id
          type
          heading
          link
          seeMore {
            text
            link
          }
        }
      }
      sectionFour {
        __typename
        ... on HomePageCardGridComponent {
          id
          type
          heading
          link
          gridVariant
          items {
            id
            title
            url
            image {
              id
              uri
              alt
              width
              height
              transformations {
                id
                label
                uri
              }
            }
          }
          seeMore {
            text
            link
          }
        }
      }
      sectionFive {
        __typename
        ... on HomePageStaffpicksComponent {
          id
          type
          heading
          link
          items {
            id
            quote
            staff_name
            staff_location
            url
            image {
              id
              uri
              alt
              width
              height
              transformations {
                id
                label
                uri
              }
            }
          }
        }
      }
      sectionSeven {
        __typename
        ... on HomePageCardGridComponent {
          id
          type
          heading
          link
          gridVariant
          items {
            id
            title
            description
            url
            image {
              id
              uri
              alt
              width
              height
              transformations {
                id
                label
                uri
              }
            }
          }
          seeMore {
            text
            link
          }
        }
      }
      sectionEight {
        __typename
        ... on HomePageCardGridComponent {
          id
          type
          heading
          link
          gridVariant
          items {
            id
            title
            description
            url
            image {
              id
              uri
              alt
              width
              height
              transformations {
                id
                label
                uri
              }
            }
          }
          seeMore {
            text
            link
          }
        }
      }
    }
  }
`;

function HomePage() {
  const router = useRouter();

  const nextRouter = router;
  nextRouter.asPath = "/home";

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

  const homePageDataSectionTwo = data.homePage.sectionTwo[0];
  const homePageDataSectionThree = data.homePage.sectionThree[0];
  const homePageDataSectionFour = data.homePage.sectionFour[0];
  const homePageDataSectionFive = data.homePage.sectionFive[0];
  const homePageDataSectionSeven = data.homePage.sectionSeven[0];
  const homePageDataSectionEight = data.homePage.sectionEight[0];

  return (
    <>
      <Meta title="homepage!" description="homepage desc!" />
      <Box className="scout__homepage">
        <ScoutHomepageV1Provider>
          <main id="main-content">
            <Box id="content-header" p={0} m={0}>
              <HeroWithData />
            </Box>
            <Box
              id="content-primary"
              width="100%"
              maxWidth="1350px"
              margin="0 auto"
              padding="0 20px"
            >
              <Spotlight
                title={homePageDataSectionTwo.heading}
                link={homePageDataSectionTwo.link}
                variant={homePageDataSectionTwo.gridVariant}
                seeMore={homePageDataSectionTwo.seeMore}
              />
              <EventCollection
                title={homePageDataSectionThree.heading}
                link={homePageDataSectionThree.link}
                seeMore={homePageDataSectionThree.seeMore}
              />
              <CardGrid
                title={homePageDataSectionFour.heading}
                link={homePageDataSectionFour.link}
                variant={homePageDataSectionFour.gridVariant}
                hoverStyle={true}
                items={homePageDataSectionFour.items}
                seeMore={homePageDataSectionFour.seeMore}
              />
              <StaffPicks
                title={homePageDataSectionFive.heading}
                link={homePageDataSectionFive.link}
                items={homePageDataSectionFive.items}
              />
              {/* From Our Blogs */}
              <CardGrid
                title={homePageDataSectionSeven.heading}
                link={homePageDataSectionSeven.link}
                variant={homePageDataSectionSeven.gridVariant}
                hoverStyle={true}
                items={homePageDataSectionSeven.items}
                // @TODO why do we add this?
                cardVariant="blog-card"
                seeMore={homePageDataSectionSeven.seeMore}
              />
              {/* Updates */}
              <CardGrid
                title={homePageDataSectionEight.heading}
                link={homePageDataSectionEight.link}
                items={homePageDataSectionEight.items}
                variant={homePageDataSectionEight.gridVariant}
                hoverStyle={true}
                seeMore={homePageDataSectionEight.seeMore}
                cardVariant="updates-card"
                size="sm"
              />
              {/* <CardGrid
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
              /> */}
            </Box>
          </main>
        </ScoutHomepageV1Provider>
      </Box>
    </>
  );
}

export default withApollo(HomePage, {
  ssr: true,
  redirects: false,
});
