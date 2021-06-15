import gql from 'graphql-tag';

export const typeDefs = gql`
  type AutoSuggestion {
    name: String
  }
  
  extend type Query {
    allAutoSuggestions: [AutoSuggestion]!
  }  
`;