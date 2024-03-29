import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer, {
  BreadcrumbsItem,
} from "../../shared/layouts/PageContainer";

import { Box, Hero } from "@nypl/design-system-react-components";
import Heading from "../../shared/Heading";
import Components from "./../../shared/ContentComponents/getReactComponent";
import PreviewModeNotification from "../../shared/PreviewModeNotification";

export const SECTION_FRONT_QUERY = gql`
  query SectionFrontQuery($id: String, $revisionId: String, $preview: Boolean) {
    sectionFront(id: $id, revisionId: $revisionId, preview: $preview) {
      id
      title
      description
      colorway {
        primary
        secondary
      }
      image {
        id
        uri
        alt
        transformations {
          id
          label
          uri
        }
      }
      breadcrumbs {
        id
        title
        url
      }
      featuredContent {
        ... on Donation {
          __typename
          id
          type
          title
          description
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
          formBaseUrl
          defaultAmount
          otherLevelId
        }
        ... on Jumbotron {
          __typename
          id
          type
          title
          description
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
          secondaryImage {
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
          link {
            title
            uri
            url
          }
        }
      }
      mainContent {
        ... on CardGrid {
          __typename
          id
          type
          title
          description
          layout
          colorway {
            primary
          }
          items {
            id
            title
            description
            link
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
            buttonLinks {
              id
              icon
              link {
                title
                uri
                url
              }
            }
          }
        }
        ... on ExternalSearch {
          __typename
          id
          type
          title
          description
          searchType
          formPlaceholder
          colorway {
            primary
          }
        }
        ... on EmailSubscription {
          __typename
          id
          type
          heading
          description
          formPlaceholder
          salesforceListId
          salesforceSourceCode
          colorway {
            primary
          }
        }
        ... on ButtonLinks {
          __typename
          id
          type
          heading
          description
          items {
            id
            icon
            link {
              title
              uri
              url
            }
          }
        }
        ... on Text {
          __typename
          id
          type
          heading
          text
        }
      }

      bottomContent {
        ... on DonorCredit {
          __typename
          id
          heading
          description
          showBorder
        }
      }
    }
  }
`;

interface SectionFrontPageProps {
  uuid: string;
  slug: string;
  isPreview?: boolean;
  revisionId?: string;
}

export default function SectionFrontPage({
  uuid,
  isPreview,
  revisionId,
}: SectionFrontPageProps) {
  const { loading, error, data } = useQuery(SECTION_FRONT_QUERY, {
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

  const sectionFront = data.sectionFront;

  return (
    <PageContainer
      metaTags={{
        title: sectionFront.title,
        description: sectionFront.description,
        imageUrl: sectionFront.image?.uri,
      }}
      breadcrumbs={
        sectionFront.breadcrumbs &&
        sectionFront.breadcrumbs.map(
          (breadcrumbsItem: {
            id: string;
            title: string;
            url: string;
          }): BreadcrumbsItem => {
            return {
              text: breadcrumbsItem.title,
              url: breadcrumbsItem.url,
            };
          }
        )
      }
      breadcrumbsColor={sectionFront.colorway.secondary}
      wrapperClass="nypl--section-fronts"
      contentHeader={
        <>
          {isPreview && <PreviewModeNotification />}
          <Hero
            heroType="tertiary"
            heading={
              <Heading level="h1" color="ui.white">
                {sectionFront.title}
              </Heading>
            }
            subHeaderText={sectionFront.description}
            backgroundColor={sectionFront.colorway.primary}
            foregroundColor="ui.white"
          />
          {sectionFront.featuredContent &&
            sectionFront.featuredContent.map(
              (contentComponent: { [key: string]: any }) =>
                Components(contentComponent)
            )}
        </>
      }
      contentPrimary={
        <Box>
          {sectionFront.mainContent &&
            sectionFront.mainContent.map(
              (contentComponent: { [key: string]: any }) =>
                Components(contentComponent)
            )}
        </Box>
      }
      contentBottom={
        <Box>
          {sectionFront.bottomContent &&
            sectionFront.bottomContent.map(
              (contentComponent: { [key: string]: any }) =>
                Components(contentComponent)
            )}
        </Box>
      }
    />
  );
}
