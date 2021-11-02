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

  type Query {
    _empty: String
  }
`;
