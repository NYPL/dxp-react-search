import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../shared/layouts/PageContainer";
import Hero from "./../shared/Hero";
import DrupalParagraphs from "../shared/DrupalParagraphs";
import ImageComponent from "../shared/ContentComponents/ImageComponent";
import Text from "../shared/ContentComponents/Text";
import Video from "./../shared/ContentComponents/Video";
import TextWithImage from "../shared/ContentComponents/TextWithImage";
import ButtonLinks from "../shared/ContentComponents/ButtonLinks";
import PreviewModeNotification from "../shared/PreviewModeNotification";

import { Box, Heading } from "@nypl/design-system-react-components";

export const PAGE_QUERY = gql`
  query PageQuery($id: String, $revisionId: String, $preview: Boolean) {
    page(id: $id, revisionId: $revisionId, preview: $preview) {
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
        ... on Hero {
          id
          type
          heroType
          title
          description
          backgroundImage {
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
          foregroundImage {
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
      mainContent {
        ... on Text {
          id
          type
          heading
          text
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
        ... on ImageComponent {
          id
          type
          caption
          credit
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
        ... on TextWithImage {
          id
          type
          heading
          text
          caption
          credit
          image {
            id
            alt
            uri
            width
            height
            transformations {
              id
              label
              uri
            }
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
      }
    }
  }
`;

interface PagePageProps {
  uuid: string;
  slug: string;
  isPreview?: boolean;
  revisionId?: string;
}

export default function PagePage({
  uuid,
  isPreview,
  revisionId,
}: PagePageProps) {
  const { loading, error, data } = useQuery(PAGE_QUERY, {
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

  const page = data.page;

  console.log(page);

  // const image = page.image;

  // const backgroundImage = getImageTransformation(
  //   "jumbotron_background_focal_point_1920x464",
  //   image.transformations
  // );

  // const foregroundImage = getImageTransformation(
  //   "max_width_960",
  //   image.transformations
  // );

  // console.log(image.transformations);
  // console.log(backgroundImage);

  const showHero = page.featuredContent === null ? false : true;

  return (
    <PageContainer
      metaTags={{
        title: page.title,
        description: page.description,
        imageUrl: page.image?.uri,
      }}
      breadcrumbs={[
        {
          text: "Hello",
          url: "/whatever",
        },
      ]}
      // breadcrumbs={
      //   sectionFront.breadcrumbs &&
      //   sectionFront.breadcrumbs.map(
      //     (breadcrumbsItem: {
      //       id: string;
      //       title: string;
      //       url: string;
      //     }): BreadcrumbsItem => {
      //       return {
      //         text: breadcrumbsItem.title,
      //         url: breadcrumbsItem.url,
      //       };
      //     }
      //   )
      // }
      // breadcrumbsColor={sectionFront.colorway.secondary}
      wrapperClass="nypl--page"
      contentHeader={
        <>
          {isPreview && <PreviewModeNotification />}
          {showHero ? (
            <Hero {...page.featuredContent} />
          ) : (
            <Box maxWidth="1280px" margin="0 auto" my="l" px="s">
              <Heading level="one">{page.title}</Heading>
            </Box>
          )}
        </>
      }
      contentPrimary={
        <DrupalParagraphs
          content={page.mainContent}
          components={{
            ButtonLinks: ButtonLinks,
            ImageComponent: ImageComponent,
            Text: Text,
            Video: Video,
            TextWithImage: TextWithImage,
          }}
        />
      }
    />
  );
}
