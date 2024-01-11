import { gql } from "@apollo/client";

export const BLOG_FIELDS_FRAGMENT = gql`
  fragment BlogFields on Blog {
    id
    title
    description
    slug
    date
    byline
    image {
      id
      uri
      alt
      transformations {
        id
        label
        uri
      }
    }
    locations {
      id
      drupalInternalId
      name
      slug
      locationCode
    }
    mainContent {
      __typename
      ... on Slideshow {
        id
        type
        heading
      }
      ... on TextWithImage {
        id
        type
        heading
        text
        caption
        credit
        link
        image {
          id
          alt
          uri
          width
          height
          transformations {
            id
            label
            uri
          }
        }
      }
      ... on Text {
        id
        type
        heading
        text
      }
      ... on Video {
        id
        type
        heading
        description
        provider
        embedCode
        oembedUrl
      }
      ... on SocialEmbed {
        id
        type
        embedCode
      }
      ... on GoogleMapEmbed {
        id
        type
        embedCode
        accessibleDescription
      }
      ... on AudioEmbed {
        id
        type
        provider
        heading
        description
        embedCode
        oembedUrl
        html
      }
      ... on ImageComponent {
        id
        type
        caption
        credit
        link
        image {
          id
          uri
          alt
          width
          height
          transformations {
            id
            label
            uri
          }
        }
      }
      ... on CardList {
        id
        type
        title
        description
        items {
          id
          title
          description
          link
          image {
            id
            uri
            alt
            width
            height
            transformations {
              id
              label
              uri
            }
          }
        }
      }
    }
  }
`;
