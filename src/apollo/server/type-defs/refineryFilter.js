import gql from "graphql-tag";

export const typeDefs = gql`
  type RefineryVocab {
    id: ID!
    name: String!
    terms: [RefineryTerm]
  }

  type RefineryTerm {
    id: ID!
    name: String!
    children: [RefineryTerm]
  }

  input RefineryTermsFilter {
    id: String!
    terms: [String]!
    operator: String!
  }

  extend type Query {
    refineryAllTerms(filter: RefineryTermsFilter): [RefineryVocab]!
  }
`;
