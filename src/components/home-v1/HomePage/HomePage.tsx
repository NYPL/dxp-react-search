import * as React from "react";
// Next
import { useRouter } from "next/router";
import Error from "./../../../pages/_error";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Theme
import ScoutHomepageV1Provider from "./../../home-v1/theme";
// Component
import { Box } from "@chakra-ui/react";
import Meta from "./../../shared/Meta";
import HeroWithData from "./../Hero/HeroWithData";
import Spotlight from "./../Spotlight";
import EventCollection from "./../EventCollection";
import CardGrid from "./../CardGrid";
import StaffPicks from "./../StaffPicks";
import Slideshow from "../Slideshow";
import homePageContent from "../../../__content/homePage";

export const HOME_PAGE_QUERY = gql`
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
        ... on HomePageStaffPicksComponent {
          id
          type
          heading
          link
          items {
            id
            quote
            staffName
            staffLocation
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
      sectionSix {
        __typename
        ... on HomePageSlideshowComponent {
          id
          type
          heading
          link
          items {
            id
            url
            title
            author
            genre
            audience
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

interface HomePageProps {
  uuid: string;
  isPreview?: boolean;
}

export default function HomePage({ uuid, isPreview = false }: HomePageProps) {
  const router = useRouter();

  const { loading, error, data } = useQuery(HOME_PAGE_QUERY, {
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
  const homePageDataSectionSix = data.homePage.sectionSix[0];
  const homePageDataSectionSeven = data.homePage.sectionSeven[0];
  const homePageDataSectionEight = data.homePage.sectionEight[0];

  const { meta } = homePageContent;

  return (
    <>
      <Meta
        title={meta.title}
        description={meta.description}
        imageUrl={meta.imageUrl}
      />
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
                id={homePageDataSectionTwo.id}
                title={homePageDataSectionTwo.heading}
                link={homePageDataSectionTwo.link}
                variant={homePageDataSectionTwo.gridVariant}
                seeMore={homePageDataSectionTwo.seeMore}
              />
              <EventCollection
                id={homePageDataSectionThree.id}
                title={homePageDataSectionThree.heading}
                link={homePageDataSectionThree.link}
                seeMore={homePageDataSectionThree.seeMore}
              />
              <CardGrid
                id={homePageDataSectionFour.id}
                title={homePageDataSectionFour.heading}
                link={homePageDataSectionFour.link}
                variant={homePageDataSectionFour.gridVariant}
                hoverStyle={true}
                items={homePageDataSectionFour.items}
                seeMore={homePageDataSectionFour.seeMore}
              />
              <StaffPicks
                id={homePageDataSectionFive.id}
                title={homePageDataSectionFive.heading}
                link={homePageDataSectionFive.link}
                items={homePageDataSectionFive.items}
                seeMore={homePageDataSectionFive.seeMore}
              />
              <Slideshow
                id={homePageDataSectionSix.id}
                title={homePageDataSectionSix.heading}
                link={homePageDataSectionSix.link}
                items={homePageDataSectionSix.items}
                seeMore={homePageDataSectionSix.seeMore}
              />
              {/* From Our Blogs */}
              <CardGrid
                id={homePageDataSectionSeven.id}
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
                id={homePageDataSectionEight.id}
                title={homePageDataSectionEight.heading}
                link={homePageDataSectionEight.link}
                items={homePageDataSectionEight.items}
                variant={homePageDataSectionEight.gridVariant}
                hoverStyle={true}
                seeMore={homePageDataSectionEight.seeMore}
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
