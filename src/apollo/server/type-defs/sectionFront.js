import gql from "graphql-tag";

export const typeDefs = gql`
  type SectionFront {
    id: ID!
    title: String!
    description: String
    image: Image
    featuredContent: [SectionFrontFeaturedContent]
    mainContent: [SectionFrontMainContent]
  }

  union SectionFrontFeaturedContent = Donation

  union SectionFrontMainContent = CardGrid | Donation | CatalogSearchForm

  type SectionFrontConnection {
    items: [SectionFront]
    pageInfo: PageInfo
  }

  extend type Query {
    sectionFrontCollection(
      limit: Int
      pageNumber: Int
      sort: Sort
    ): SectionFrontConnection
    sectionFront(id: String, revisionId: String, preview: Boolean): SectionFront
  }
`;
