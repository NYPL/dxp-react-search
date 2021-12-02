import gql from "graphql-tag";

export const typeDefs = gql`
  type PageInfo {
    totalItems: Int
    limit: Int
    pageNumber: Int
    pageCount: Int
    timestamp: String
    clientIp: String
  }

  type Image {
    id: ID!
    alt: String
    uri: String!
    transformations: [ImageTransformation]
  }

  type ImageTransformation {
    id: ID!
    label: String!
    uri: String!
  }

  type TextWithImage {
    id: ID!
    type: String!
    heading: String
    text: String!
    image: Image
  }

  type Video {
    id: ID!
    type: String!
    heading: String
    description: String
    video: String!
  }

  type Slideshow {
    id: ID!
    type: String!
    heading: String
    description: String
    images: [Image]!
  }

  type Query {
    _empty: String
  }
`;
