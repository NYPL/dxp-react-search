import gql from "graphql-tag";

export const drupalParagraphsTypeDefs = gql`
  type TextWithImage {
    id: ID!
    type: String!
    heading: String
    text: String!
    image: Image
    link: String
    caption: String
    credit: String
    imageAlignment: String
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

  type ExternalSearch {
    id: ID!
    type: String!
    title: String
    description: String
    searchType: String
    formPlaceholder: String
    colorway: Colorway
  }

  type CardGrid {
    id: ID!
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
    buttonLinks: [ButtonLink]
  }

  type Jumbotron {
    id: ID!
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

  type EmailSubscription {
    id: ID!
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
    type: String!
    heading: String
    description: String
    buttonType: String
    items: [ButtonLink]
  }

  type DonorCredit {
    id: ID!
    type: String!
    heading: String
    description: String!
    showBorder: Boolean!
  }
`;
