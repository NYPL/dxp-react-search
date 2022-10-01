import gql from "graphql-tag";

export const typeDefs = gql`
  type PressRelease {
    id: ID!
    title: String!
    subTitle: String
    description: String
    image: Image
    slug: String!
    date: String!
    mediaContacts: String
    mainContent: [PressReleaseMainContent]
  }

  type PressReleaseConnection {
    items: [PressRelease]
    pageInfo: PageInfo
  }

  union PressReleaseMainContent = Text | TextWithImage | ImageComponent

  input PressFilter {
    status: QueryFilterItemBoolean
  }

  extend type Query {
    allPressReleases(
      limit: Int
      pageNumber: Int
      sort: Sort
      filter: PressFilter
    ): PressReleaseConnection
    pressRelease(id: String, revisionId: String, preview: Boolean): PressRelease
  }
`;
