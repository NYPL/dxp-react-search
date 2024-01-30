import gql from "graphql-tag";

export const autoSuggestionsTypeDefs = gql`
  type AutoSuggestion {
    name: String
  }

  extend type Query {
    allAutoSuggestions: [AutoSuggestion]!
  }
`;
