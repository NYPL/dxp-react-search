import gql from 'graphql-tag';

export const typeDefs = gql`
  type ResourceTopic {
    id: ID!
    name: String!
    description: String
    imageUrl: String
  }

  type OnlineResource {
    id: ID!
    name: String!
    description: String
    slug: String
  }

  input OnlineResourceFilter {
    mostPopular: Boolean
  }
`;
