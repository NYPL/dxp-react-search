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

  input TermQueryFilter {
    featured: QueryFilterItemBoolean
    limiter: QueryFilterItemString
  }

  extend type Query {
    allTermsByVocab(
      vocabulary: String
      limit: Int
      filter: TermQueryFilter
      sort: Sort
    ): [Term]!
    term(id: String, vocabulary: String): Term
  }
`;
