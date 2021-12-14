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
    html: String!
  }

  type AudioEmbed {
    id: ID!
    type: String!
    html: String!
  }

  type SocialEmbed {
    id: ID!
    type: String!
    embedCode: String!
  }

  type Slideshow {
    id: ID!
    type: String!
    heading: String
    description: String
    images: [Image]!
  }

  type Text {
    id: ID!
    type: String!
    text: String!
    heading: String
  }

  type Query {
    _empty: String
  }
`;
