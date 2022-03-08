import gql from "graphql-tag";

export const typeDefs = gql`
  type PressRelease {
    id: ID!
    title: String!
    description: String
    image: Image
    slug: String!
    date: String!
    mediaContacts: String!
    mainContent: [PressReleaseMainContent]
  }

  type PressReleaseConnection {
    items: [PressRelease]
    pageInfo: PageInfo
  }

  union PressReleaseMainContent = Text | TextWithImage | ImageComponent

  extend type Query {
    allPressReleases(limit: Int, pageNumber: Int): PressReleaseConnection
    pressRelease(id: String, revisionId: String, preview: Boolean): PressRelease
  }
`;
