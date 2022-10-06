import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../../shared/layouts/PageContainer";
import Error from "../../../pages/_error";
import { Grid, Heading, Hero } from "@nypl/design-system-react-components";
import Donation from "../Donation";
// import CardCollection from "../../shared/ContentComponents/CardCollection";
import CardGrid from "../../shared/CardGrid";
// import CardSet from "../../shared/Card/CardSet";
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
      contentPrimary={
        // <Box mb="xl">
        //   <Heading level="two" color="brand.primary">
        //     Campaigns
        //   </Heading>
        //   <Grid
        //     as="ul"
        //     listStyleType="none"
        //     gap="l"
        //     templateColumns="repeat(1, 1fr)"
        //   >
        //     <li>Hello</li>
        //   </Grid>
        // </Box>
        // <CardCollection
        //   id="test"
        //   type="whatever"
        //   heading="Campaigns"
        //   //headingColor="brand.primary"
        //   //description="whatever"
        //   layout="row"
        //   // image={
        //   //   aspectRatio: "twoByOne",
        //   //   transformationLabel: "2_1_960"
        //   // }
        //   //imageTransformationLabel="2_1_960"
        //   items={mockCardGridContent.items}
        // />
        <>
          <CardGrid
            id="test"
            type="whatever"
            heading="Campaigns"
            headingColor="brand.primary"
            description="whatever"
            layout="row"
            //imageTransformationLabel="2_1_960"
            items={mockCardGridContent.items}
          />
          <CardGrid
            id="test2"
            type="whatever"
            heading="Campaigns"
            headingColor="brand.primary"
            description="whatever"
          >
            <Grid
              as="ul"
              listStyleType="none"
              gap="l"
              templateColumns="repeat(1, 1fr)"
            >
              <li>Hello</li>
            </Grid>
          </CardGrid>
          <CardGrid
            id="test3"
            type="whatever"
            heading="Featured Posts"
            headingColor="brand.primary"
            description="whatever"
            layout="column"
            href="/test"
            hrefText="View all blog posts"
            //imageTransformationLabel="2_1_960"
            items={mockCardGridContent.items}
          />
        </>
      }
    />
  );
}

const mockCardGridContent = {
  id: "test",
  type: "whatever",
  heading: "Campaigns",
  headingColor: "brand.primary",
  layout: "row",
  transformationLabel: "2_1_960",
  items: [
    {
      id: "item-1",
      title: "Item 1",
      description:
        "Government funding pays only a portion of the Library's operating expenses.",
      image: {
        id: "test-id-1",
        alt: "image-1-alt-text",
        layout: "responsive",
        width: 400,
        height: 200,
        quality: 90,
        uri: "https://placeimg.com/400/200/arch",
        useTransformation: false,
        transformationLabel: "2_1_960",
      },
      href: "https://google.com",
    },
    {
      id: "item-2",
      title: "Item 2",
      description:
        "Each dollar you give helps the Library serve people of all ages, backgrounds, and beliefs.",
      image: {
        id: "test-id-2",
        alt: "image-2-alt-text",
        layout: "responsive",
        width: 400,
        height: 200,
        quality: 90,
        uri: "https://placeimg.com/400/200/dogs",
        useTransformation: false,
        transformationLabel: "2_1_960",
      },
      href: "https://google.com",
    },
    {
      id: "item-3",
      title: "Item 3",
      description:
        "Each dollar you give helps the Library serve people of all ages, backgrounds, and beliefs.",
      image: {
        id: "test-id-2",
        alt: "image-2-alt-text",
        layout: "responsive",
        width: 400,
        height: 200,
        quality: 90,
        uri: "https://placeimg.com/400/200/cats",
        useTransformation: false,
        transformationLabel: "2_1_960",
      },
      href: "https://google.com",
    },
  ],
};
