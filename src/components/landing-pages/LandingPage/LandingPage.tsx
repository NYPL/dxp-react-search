import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../../shared/layouts/PageContainer";

import { Box, Heading, Hero } from "@nypl/design-system-react-components";
import TextFormatted from "../../shared/TextFormatted";
import Components from "./../../shared/ContentComponents/getReactComponent";
import PreviewModeNotification from "../../shared/PreviewModeNotification";

export const LANDING_PAGE_QUERY = gql`
  query LandingPageQuery($id: String, $revisionId: String, $preview: Boolean) {
    landingPage(id: $id, revisionId: $revisionId, preview: $preview) {
      id
      slug
      title
      description
      sectionTitle
      backgroundImage {
        id
        alt
        uri
        width
        height
        transformations {
          id
        }
      }
      foregroundImage {
        id
        alt
        uri
        width
        height
        transformations {
          id
        }
      }
      mainContent {
        __typename
        ... on FeaturedCard {
          id
          type
          heading
          description
          imageDirection
          image {
            id
            alt
            uri
            width
            height
            transformations {
              id
            }
          }
          bgColor
          link
          linkText
        }
        ... on FeaturedText {
          id
          type
          heading
          text
          bg
        }
        ... on Slideshow {
          id
          type
          heading
          description
          images {
            id
            alt
            uri
            width
            height
          }
        }
        ... on CatalogList {
          id
          type
          heading
          description
          items {
            id
            title
            description
            isbn
            bNumber
            eBookbNumber
            author
          }
          secondaryItems {
            id
            title
            description
            isbn
            bNumber
            eBookbNumber
            author
          }
        }
        ... on FeaturedCardGrid {
          id
          type
          items {
            id
            heading
            description
            imageDirection
            image {
              id
              alt
              uri
              width
              height
              transformations {
                id
              }
            }
            bgColor
            link
            linkText
          }
        }
        ... on Video {
          id
          type
          heading
          description
          provider
          embedCode
          oembedUrl
        }
      }
    }
  }
`;

interface LandingPageProps {
  uuid: string;
  slug: string;
  isPreview?: boolean;
  revisionId?: string;
}

export default function LandingPage({
  uuid,
  isPreview,
  revisionId,
}: LandingPageProps) {
  const { loading, error, data } = useQuery(LANDING_PAGE_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      ...(isPreview && {
        preview: true,
        revisionId: revisionId,
      }),
    },
  });

  // Error state.
  if (error) {
    return <div>Error.</div>;
  }

  // Loading state.
  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const landingPage = data.landingPage;

  return (
    <PageContainer
      metaTags={{
        title: landingPage.title,
        description: landingPage.description,
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: "http://www.nypl.org",
        },
      ]}
      //breadcrumbsColor={sectionFront.colorway.secondary}
      wrapperClass="nypl--landing-page"
      contentHeader={
        <>
          {isPreview && <PreviewModeNotification />}
          <Hero
            heroType="campaign"
            heading={<Heading id="1" level="one" text={landingPage.title} />}
            subHeaderText={<TextFormatted html={landingPage.description} />}
            backgroundImageSrc={landingPage.backgroundImage.uri}
            imageProps={{
              alt: landingPage.foregroundImage.alt,
              src: landingPage.foregroundImage.uri,
            }}
          />
        </>
      }
      contentPrimary={
        <Box>
          {landingPage.mainContent &&
            landingPage.mainContent.map(
              (contentComponent: { [key: string]: any }) =>
                Components(contentComponent)
            )}
        </Box>
      }
    />
  );
}
