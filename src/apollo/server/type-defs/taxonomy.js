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
`;
