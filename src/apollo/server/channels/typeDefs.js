import gql from 'graphql-tag';

export const typeDefs = gql`
  type Channel {
    id: ID!
    tid: String
    name: String!
    description: String
    imageUrl: String
    url: String
  }

  extend type Query {
    allChannels(type: String): [Channel]!
    channel(slug: String): Channel
  }
`;