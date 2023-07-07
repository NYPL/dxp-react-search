import gql from "graphql-tag";

export const typeDefs = gql`
  # Resolves to the landing_page content type in Drupal.
  type LandingPage {
    id: ID!
    slug: String!
    title: String!
    description: String
    contentType: String
    sectionTitle: String
    backgroundimage: Image
    foregroundImage: Image
    mainContent: [LandingPageMainContent]
  }

  union LandingPageMainContent =
      Text
    | LandingPageFeaturedCard
    | LandingPageCardGrid
    | Slideshow
    | CatalogList

  # Resolves to the featured_card paragraph type in Drupal.
  type LandingPageFeaturedCard {
    id: ID!
    type: String!
    heading: String
    description: String
    image: Image
    imageDirection: String
    link: String
    linkText: String
    bgColor: String
  }

  type LandingPageCardGrid {
    id: ID!
    type: String!
    items: [LandingPageFeaturedCard]!
  }

  type LandingPageConnection {
    items: [LandingPage]
    pageInfo: PageInfo
  }

  extend type Query {
    landingPageCollection(
      limit: Int
      pageNumber: Int
      sort: Sort
    ): LandingPageConnection
    landingPage(id: String, revisionId: String, preview: Boolean): LandingPage
  }
`;
