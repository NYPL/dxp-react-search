import * as React from "react";
// Apollo
import { gql, useQuery } from "@apollo/client";
// Components
import { BreadcrumbsItem } from "../shared/layouts/PageContainer";
import PageContainer from "./layout/PageContainer";
import PreviewModeNotification from "../shared/PreviewModeNotification";
import Hero from "./../shared/Hero";
import CardGrid from "./../shared/CardGrid";
import EmailSubscription from "../shared/EmailSubscription";
import GoogleMapEmbed from "../shared/ContentComponents/GoogleMapEmbed";
import DrupalParagraphs from "../shared/DrupalParagraphs";
import AudioEmbed from "../shared/ContentComponents/AudioEmbed";
import ButtonLinks from "../shared/ContentComponents/ButtonLinks";
import ImageComponent from "../shared/ContentComponents/ImageComponent";
import Slideshow from "../shared/ContentComponents/Slideshow";
import SocialEmbed from "../shared/ContentComponents/SocialEmbed";
import Text from "../shared/ContentComponents/Text";
import TextWithImage from "../shared/ContentComponents/TextWithImage";
import Video from "./../shared/ContentComponents/Video";

import { Box, Heading } from "@nypl/design-system-react-components";
import { SecondaryNav } from "./secondaryNav";

export const PAGE_QUERY = gql`
  query PageQuery($id: String, $revisionId: String, $preview: Boolean) {
    page(id: $id, revisionId: $revisionId, preview: $preview) {
      id
      title
      breadcrumbs {
        id
        title
        url
      }
      activeTrail {
        items {
          id
          title
          parent
          activeLink
        }
        ids
      }
      enableSidebar
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
        ... on AudioEmbed {
          id
          type
          heading
          description
          provider
          embedCode
          oembedUrl
          html
        }
        ... on CardGrid {
          __typename
          id
          type
          title
          description
          layout
          items {
            id
            title
            description
            link
            buttonLinks
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
        }
        ... on ButtonLinks {
          __typename
          id
          type
          heading
          description
          buttonType
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
        ... on EmailSubscription {
          id
          type
          heading
          description
          formPlaceholder
          salesforceListId
          salesforceSourceCode
        }
        ... on GoogleMapEmbed {
          id
          type
          embedCode
          accessibleDescription
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
        ... on Slideshow {
          id
          type
          heading
          description
          images {
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
        ... on SocialEmbed {
          id
          type
          embedCode
        }
        ... on Text {
          id
          type
          heading
          text
        }
        ... on TextWithImage {
          id
          type
          heading
          text
          caption
          credit
          link
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
          imageAlignment
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

interface PagePageProps {
  uuid: string;
  slug: string;
  isPreview?: boolean;
  revisionId?: string;
}

export default function PagePage({
  uuid,
  slug,
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

  const showHero = page.featuredContent === null ? false : true;
  const showSidebar = page.enableSidebar;

  // const activeLinkParentId = page.activeTrail.forEach((item: any => {
  //   if {item.activeLink) {
  //     return item.parent;
  //   }
  // })
  // let parentId;
  // page.activeTrail?.items.forEach((item: any) => {
  //   if (item.activeLink === true) {
  //     parentId = item.parent;
  //   }
  // });
  // console.log(page.activeTrail);

  // Fixed parent, always the level 2 menu item.
  const parentId = page.activeTrail?.items[1].id;

  return (
    <PageContainer
      metaTags={{
        title: page.title,
        description: page.description,
        imageUrl: page.image?.uri,
      }}
      breadcrumbs={
        page.breadcrumbs &&
        page.breadcrumbs.map(
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
      // breadcrumbsColor={sectionFront.colorway.secondary}
      wrapperClass="nypl--page"
      contentHeader={
        <>
          {isPreview && <PreviewModeNotification />}
          {showHero && <Hero {...page.featuredContent} />}
        </>
      }
      showSidebar={showSidebar}
      sidebarSide="left"
      {...(showSidebar && {
        contentSecondary: (
          <SecondaryNav
            id="secondary-menu"
            parentId={parentId}
            currentPath={slug}
            activeTrailIds={page.activeTrail.ids}
          />
        ),
      })}
      contentPrimary={
        <>
          {!showHero && (
            <Box maxWidth="1280px" margin="0 auto" my="l">
              <Heading level="one">{page.title}</Heading>
            </Box>
          )}
          <DrupalParagraphs
            content={page.mainContent}
            components={{
              AudioEmbed: AudioEmbed,
              ButtonLinks: ButtonLinks,
              CardGrid: CardGrid,
              EmailSubscription: EmailSubscription,
              GoogleMapEmbed: GoogleMapEmbed,
              ImageComponent: ImageComponent,
              Slideshow: Slideshow,
              SocialEmbed: SocialEmbed,
              Text: Text,
              TextWithImage: TextWithImage,
              Video: Video,
            }}
          />
        </>
      }
    />
  );
}
