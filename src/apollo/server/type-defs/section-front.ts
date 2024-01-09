import gql from "graphql-tag";

export const sectionFronttypeDefs = gql`
  type SectionFront {
    id: ID!
    title: String!
    description: String
    image: Image
    breadcrumbs: [BreadcrumbsItem]
    featuredContent: SectionFrontFeaturedContent
    mainContent: [SectionFrontMainContent]
    bottomContent: [SectionFrontBottomContent]
    colorway: Colorway
  }

  union SectionFrontFeaturedContent = Donation | Jumbotron

  union SectionFrontMainContent =
      ButtonLinks
    | CardGrid
    | EmailSubscription
    | ExternalSearch
    | Text

  union SectionFrontBottomContent = DonorCredit

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
