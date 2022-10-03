import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../../shared/layouts/PageContainer";
import Error from "../../../pages/_error";
import { Box, Heading, Hero } from "@nypl/design-system-react-components";
import DonationPromo from "../DonationPromo";
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

  return (
    <PageContainer
      metaTags={{
        title: sectionFront.title,
        description: sectionFront.description,
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
          <DonationPromo
            id="give-donation"
            heading="Donate to NYPL"
            description="Each dollar you give helps the Library serve people of all ages,
  backgrounds, and beliefs. Monthly donors provide much-needed
  consistent support to the Library. Receive a tote as a thank you
  gift."
            defaultAmount="200"
            donationFormBaseUrl="https://secure.nypl.org/site/Donation2?7825.donation=form1&df_id=7825"
            donationOtherLevelId="21325"
          />
        </>
      }
      contentPrimary={<Box>contentPrimary</Box>}
    />
  );
}
