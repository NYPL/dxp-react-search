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
    width: Int
    height: Int
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
    caption: String
    credit: String
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

  type GoogleMapEmbed {
    id: ID!
    type: String!
    embedCode: String!
    accessibleDescription: String!
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

  type ImageComponent {
    id: ID!
    type: String!
    image: Image
    caption: String
    credit: String
  }

  type CardList {
    id: ID!
    type: String!
    heading: String
    description: String
    items: [CardItem]!
  }

  type CardItem {
    id: ID!
    title: String
    description: String
    image: Image
    link: String
  }

  type CatalogList {
    id: ID!
    type: String!
    heading: String
    description: String
    items: [CatalogListItem]!
  }

  type CatalogListItem {
    id: ID!
    title: String
    description: String
    isbn: String
    link: String
  }

  type Query {
    _empty: String
  }
`;
