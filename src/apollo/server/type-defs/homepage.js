import gql from "graphql-tag";

export const typeDefs = gql`
  type HomePage {
    id: ID!
    title: String!
    description: String
    publishDate: String
    unpublishDate: String
    slotOne: [SlotOne]
  }

  union SlotOne = HpHero | HpVideo

  type HpHero {
    id: ID!
    type: String
    heading: String
    description: String
    image: Image
  }

  type HpVideo {
    id: ID!
    type: String!
    heading: String
    description: String
    provider: String!
    embedCode: String!
    oembedUrl: String!
  }

  extend type Query {
    homePage(id: String, revisionId: String, preview: Boolean): HomePage
  }
`;
