import gql from 'graphql-tag';

export const typeDefs = gql`
  interface SearchDocument {
    id: ID!
    slug: String!
    name: String!
    description: String
  }

  type OnlineResourceDocument implements SearchDocument {
    id: ID!
    slug: String!
    name: String!
    description: String
    mostPopular: String
  }

  type SearchConnection {
    items: [SearchDocument]
    pageInfo: PageInfo
  }

  input SearchDocumentFilter {
    q: String
  }
`;