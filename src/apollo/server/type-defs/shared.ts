import gql from "graphql-tag";

export const sharedTypeDefs = gql`
  type Image {
    id: ID!
    alt: String
    uri: String!
    transformations: [ImageTransformation]
    width: Int
    height: Int
  }

  type ImageTransformation {
    id: ID!
    label: String!
    uri: String!
  }

  type BreadcrumbsItem {
    id: ID!
    title: String!
    url: String!
  }

  type Colorway {
    primary: String
    secondary: String
  }
`;
