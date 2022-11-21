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

  input Sort {
    field: String
    direction: String
  }

  input QueryFilterItemReference {
    fieldName: String!
    operator: String!
    conjunction: String!
    value: [String]!
  }

  input QueryFilterItemBoolean {
    fieldName: String!
    operator: String!
    value: Boolean
  }

  input QueryFilterItemString {
    fieldName: String!
    operator: String!
    value: String
  }

  input QueryFilterItemArray {
    fieldName: String!
    operator: String!
    value: [String]!
  }

  # New QueryFilters pattern.
  input QueryFilter {
    experimental: Boolean
    conjunction: String
    groups: [QueryFilterGroup]
    conditions: [QueryFilterCondition]
  }

  input QueryFilterGroup {
    conjunction: String
    conditions: [QueryFilterCondition]
  }

  input QueryFilterCondition {
    field: String
    operator: String
    value: String
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
    provider: String!
    embedCode: String!
    oembedUrl: String!
  }

  type AudioEmbed {
    id: ID!
    type: String!
    heading: String
    description: String
    provider: String!
    embedCode: String!
    oembedUrl: String!
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
    link: String
  }

  type CardList {
    id: ID!
    type: String!
    title: String
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
    bNumber: String
  }

  type Donation {
    id: ID!
    type: String!
    title: String
    description: String
    image: Image
    formBaseUrl: String
    otherLevelId: String
    defaultAmount: String
  }

  type CatalogSearchForm {
    id: ID!
    type: String!
    title: String
    description: String
    formBaseUrl: String
    formPlaceholder: String
  }

  type CardGrid {
    id: ID!
    type: String!
    title: String
    description: String
    layout: String
    items: [CardGridItem]!
  }

  type CardGridItem {
    id: ID!
    title: String
    description: String
    image: Image
    link: String
  }

  type Query {
    _empty: String
  }
`;
