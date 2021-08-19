import gql from "graphql-tag";

export const typeDefs = gql`
  type Term {
    id: ID!
    tid: String!
    name: String!
    description: String
    image: Image
    url: String
  }

  extend type Query {
    allTermsByVocab(vocabulary: String): [Term]!
    termBySlug(slug: String): Term
  }
`;
