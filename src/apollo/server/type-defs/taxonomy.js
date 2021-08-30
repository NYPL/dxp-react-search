import gql from "graphql-tag";

export const typeDefs = gql`
  type Term {
    id: ID!
    tid: String!
    title: String!
    description: String
    image: Image
    slug: String
  }

  extend type Query {
    allTermsByVocab(
      vocabulary: String
      sortBy: String
      limit: Int
      featured: Boolean
    ): [Term]!
    termBySlug(slug: String, vocabulary: String): Term
  }
`;
