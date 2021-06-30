import gql from 'graphql-tag';

export const typeDefs = gql`
  type Vocab {
    id: ID!
    name: String!
    terms: [Term]
  }

  type Term {
    id: ID!
    name: String!
    children: [Term]
  }

  input TermsFilter {
    id: String!
    terms: [String]!
    operator: String!
  }

  type FilterGroup {
    id: ID!
    name: String!
    items: [FilterItem]
  }

  type FilterItem {
    id: ID!
    name: String!
    children: [FilterItem]
  }

  extend type Query {
    allTerms(filter: TermsFilter): [Vocab]!
    filterGroupById(id: String): [FilterGroup]
  }
`;