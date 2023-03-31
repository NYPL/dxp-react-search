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
    status: Boolean
    type: String!
    heading: String
    text: String!
    image: Image
    caption: String
    credit: String
  }

  type Video {
    id: ID!
    status: Boolean
    type: String!
    heading: String
    description: String
    provider: String!
    embedCode: String!
    oembedUrl: String!
  }

  type AudioEmbed {
    id: ID!
    status: Boolean
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
    status: Boolean
    type: String!
    embedCode: String!
  }

  type GoogleMapEmbed {
    id: ID!
    status: Boolean
    type: String!
    embedCode: String!
    accessibleDescription: String!
  }

  type Slideshow {
    id: ID!
    status: Boolean
    type: String!
    heading: String
    description: String
    images: [Image]!
  }

  type Text {
    id: ID!
    status: Boolean
    type: String!
    text: String
    heading: String
  }

  type ImageComponent {
    id: ID!
    status: Boolean
    type: String!
    image: Image
    caption: String
    credit: String
    link: String
  }

  type CardList {
    id: ID!
    status: Boolean
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
    status: Boolean
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
    status: Boolean
    type: String!
    title: String
    description: String
    image: Image
    formBaseUrl: String
    otherLevelId: String
    defaultAmount: String
  }

  type ExternalSearch {
    id: ID!
    status: Boolean
    type: String!
    title: String
    description: String
    searchType: String
    formPlaceholder: String
    colorway: Colorway
  }

  type CardGrid {
    id: ID!
    status: Boolean
    type: String!
    title: String
    description: String
    layout: String
    items: [CardGridItem]!
    colorway: Colorway
  }

  type CardGridItem {
    id: ID!
    title: String
    description: String
    image: Image
    link: String
  }

  type Jumbotron {
    id: ID!
    status: Boolean
    type: String!
    title: String
    description: String
    image: Image
    secondaryImage: Image
    link: Link
  }

  type Link {
    title: String
    uri: String
    url: String!
  }

  type Colorway {
    primary: String
    secondary: String
  }

  type Query {
    _empty: String
  }

  type EmailSubscription {
    id: ID!
    status: Boolean
    type: String!
    heading: String
    description: String
    formPlaceholder: String
    salesforceListId: String
    salesforceSourceCode: String
    colorway: Colorway
  }

  type ButtonLink {
    id: ID!
    icon: String
    link: Link
  }

  type ButtonLinks {
    id: ID!
    status: Boolean
    type: String!
    heading: String
    description: String
    items: [ButtonLink]
  }
`;
