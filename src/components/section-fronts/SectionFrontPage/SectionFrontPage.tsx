import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer, {
  BreadcrumbsItem,
} from "../../shared/layouts/PageContainer";
import { Box, Heading, Hero } from "@nypl/design-system-react-components";
import PreviewModeNotification from "../../shared/PreviewModeNotification";
// Drupal Paragraphs.
import DrupalParagraphs from "../../shared/DrupalParagraphs";
import ButtonLinks from "../../shared/ContentComponents/ButtonLinks";
import CardGrid from "./../../shared/CardGrid";
import Donation from "../Donation";
import DonorCredit from "../../shared/DonorCredit";
import EmailSubscription from "../../shared/EmailSubscription";
import ExternalSearch from "../../shared/ContentComponents/ExternalSearch";
import Jumbotron from "../../shared/ContentComponents/Jumbotron";
import Text from "../../shared/ContentComponents/Text";

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
            heading={<Heading level="one" text={sectionFront.title} />}
            subHeaderText={sectionFront.description}
            backgroundColor={sectionFront.colorway.primary}
            foregroundColor="ui.white"
          />
          <DrupalParagraphs
            content={sectionFront.featuredContent}
            components={{
              Donation: Donation,
              Jumbotron: Jumbotron,
            }}
          />
        </>
      }
      contentPrimary={
        <Box>
          <DrupalParagraphs
            content={sectionFront.mainContent}
            components={{
              ButtonLinks: ButtonLinks,
              CardGrid: CardGrid,
              EmailSubscription: EmailSubscription,
              ExternalSearch: ExternalSearch,
              Text: Text,
            }}
          />
        </Box>
      }
      {...(sectionFront.bottomContent && {
        contentBottom: (
          <DrupalParagraphs
            content={sectionFront.bottomContent}
            components={{
              DonorCredit: DonorCredit,
            }}
          />
        ),
      })}
    />
  );
}
