import * as React from "react";
// import { useRouter } from "next/router";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../../shared/layouts/PageContainer";
import { Box, Heading, Hero } from "@nypl/design-system-react-components";
import Donation from "../Donation";
import Components from "./../../shared/ContentComponents/getReactComponent";
import PreviewModeNotification from "../../shared/PreviewModeNotification";
// Content + config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

// Used in the catch all page template to determine component to render.
export const sectionFrontsSlugs = [
  "/give",
  "/research",
  "/research/collections",
  "/research/support",
];

// Generate the static paths for getStaticPaths
type GetStaticPropsParamsType = {
  params: { slug: string[] };
};

let slugsArray: GetStaticPropsParamsType[] = [];
sectionFrontsSlugs.forEach((slug) => {
  slugsArray.push({ params: { slug: [slug.replace("/", "")] } });
});

export const sectionFrontsPaths = slugsArray;

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
      }
      mainContent {
        ... on CardGrid {
          __typename
          id
          type
          title
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
          sourceCode
          colorway {
            primary
          }
        }
      }
    }
  }
`;

interface SectionFrontPageProps {
  uuid: string;
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

  // @TODO This might not always be the donation component?
  const featuredContent = sectionFront.featuredContent[0];

  return (
    <PageContainer
      metaTags={{
        title: sectionFront.title,
        description: sectionFront.description,
        imageUrl: sectionFront.image?.uri,
      }}
      breadcrumbs={[
        {
          text: "Home",
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
        },
        {
          text: sectionFront.title,
          url: `${NEXT_PUBLIC_NYPL_DOMAIN}`,
        },
      ]}
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
          {featuredContent && (
            <Donation
              id={featuredContent.id}
              title={featuredContent.title}
              description={featuredContent.description}
              image={featuredContent.image}
              donationFormBaseUrl={featuredContent.formBaseUrl}
              defaultAmount={featuredContent.defaultAmount}
              donationOtherLevelId={featuredContent.otherLevelId}
            />
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
    />
  );
}
