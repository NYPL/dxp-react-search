import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../../shared/layouts/PageContainer";

import { Box } from "@nypl/design-system-react-components";
//import Components from "./../../shared/ContentComponents/getReactComponent";
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
        ... on LandingPageFeaturedCard {
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
        ... on Text {
          id
          type
          heading
          text
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
        ... on LandingPageCardGrid {
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
      wrapperClass="nypl--landing-page"
      contentHeader={<>{isPreview && <PreviewModeNotification />}</>}
      contentPrimary={
        <Box>
          <p>{landingPage.title}</p>
          <p>{landingPage.backgroundImage.uri}</p>
          <p>{landingPage.foregroundImage.uri}</p>
          {landingPage.description}
        </Box>
      }
    />
  );
}
