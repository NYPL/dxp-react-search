import gql from 'graphql-tag';

export const typeDefs = gql`
  type Channel {
    id: ID!
    tid: String
    name: String!
    description: String
    imageUrl: String
    image: Image
    url: String
  }

  type Image {
    id: ID!
    alt: String
    uri: String
    transformations: [ImageTransformation]
  }

  type ImageTransformation {
    id: ID!
    label: String
    uri: String
  }

  extend type Query {
    allChannels(type: String): [Channel]!
    channel(slug: String): Channel
  }
`;