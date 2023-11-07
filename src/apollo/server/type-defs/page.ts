import gql from "graphql-tag";

export const PageTypeDefs = gql`
  type Page {
    id: ID!
    title: String!
    description: String
    image: Image
    # breadcrumbs: [BreadcrumbsItem]
    featuredContent: PageFeaturedContent
    mainContent: [PageMainContent]
  }

  union PageFeaturedContent = Hero

  union PageMainContent =
      AudioEmbed
    | ButtonLinks
    | CardGrid
    | EmailSubscription
    | GoogleMapEmbed
    | ImageComponent
    | Slideshow
    | SocialEmbed
    | Text
    | TextWithImage
    | Video

  type PageConnection {
    items: [Page]
    pageInfo: PageInfo
  }

  type Hero {
    id: ID!
    type: String!
    title: String
    description: String
    heroType: String
    backgroundImage: Image
    foregroundImage: Image
  }

  extend type Query {
    pageCollection(limit: Int, pageNumber: Int, sort: Sort): PageConnection
    page(id: String, revisionId: String, preview: Boolean): Page
  }
`;
