import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../../shared/layouts/PageContainer";
import Error from "../../../pages/_error";
import { Box, Heading, Hero } from "@nypl/design-system-react-components";
import Donation from "../Donation";
// Content + config
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

// Used in the catch all page template to determine component to render.
export const sectionFrontsSlugs = ["/give"];

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
          heading
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
    }
  }
`;

interface SectionFrontPageProps {
  uuid: string;
  isPreview?: boolean;
}

export default function SectionFrontPage({
  uuid,
}: //isPreview,
SectionFrontPageProps) {
  const { loading, error, data } = useQuery(SECTION_FRONT_QUERY, {
    skip: !uuid,
    variables: {
      id: uuid,
      // ...(isPreview && {
      //   preview: true,
      //   revisionId: router.query.revision_id,
      // }),
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

  const sectionFront = data.sectionFront;

  // @TODO This might not always be the donation component?
  const featuredContent = sectionFront.featuredContent[0];

  return (
    <PageContainer
      metaTags={{
        title: sectionFront.title,
        description: sectionFront.description,
        imageUrl: sectionFront.image.uri,
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
      breadcrumbsColor="booksAndMore"
      wrapperClass="nypl--section-fronts"
      contentHeader={
        <>
          <Hero
            heroType="tertiary"
            heading={<Heading level="one" text={sectionFront.title} />}
            subHeaderText={sectionFront.description}
            backgroundColor="brand.primary"
            foregroundColor="ui.white"
          />
          <Donation
            id={featuredContent.id}
            heading={featuredContent.heading}
            description={featuredContent.description}
            image={featuredContent.image}
            donationFormBaseUrl={featuredContent.formBaseUrl}
            defaultAmount={featuredContent.defaultAmount}
            donationOtherLevelId={featuredContent.otherLevelId}
          />
        </>
      }
      contentPrimary={<Box>contentPrimary</Box>}
    />
  );
}
