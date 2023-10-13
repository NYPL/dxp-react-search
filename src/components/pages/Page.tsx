import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import PageContainer from "../shared/layouts/PageContainer";
import DrupalParagraphs from "../shared/DrupalParagraphs";
import ImageComponent from "../shared/ContentComponents/ImageComponent";
import Text from "../shared/ContentComponents/Text";
import Video from "./../shared/ContentComponents/Video";
import TextWithImage from "../shared/ContentComponents/TextWithImage";
import ButtonLinks from "../shared/ContentComponents/ButtonLinks";
import PreviewModeNotification from "../shared/PreviewModeNotification";

export const PAGE_QUERY = gql`
  query PageQuery($id: String, $revisionId: String, $preview: Boolean) {
    page(id: $id, revisionId: $revisionId, preview: $preview) {
      id
      title
      description
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
      contentHeader={<>{isPreview && <PreviewModeNotification />}</>}
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
