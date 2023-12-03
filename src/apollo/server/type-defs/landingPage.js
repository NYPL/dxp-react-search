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
    backgroundImage: Image
    foregroundImage: Image
    mainContent: [LandingPageMainContent]
  }

  union LandingPageMainContent =
      FeaturedText
    | FeaturedCard
    | FeaturedCardGrid
    | Slideshow
    | CatalogList
    | Video

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
