import { gql } from "@apollo/client";

export const PRESS_FIELDS_FRAGMENT = gql`
  fragment PressFields on PressRelease {
    id
    title
    description
    slug
    date
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
    mainContent {
      __typename
      ... on Text {
        id
        type
        heading
        text
      }
      ... on TextWithImage {
        id
        type
        heading
        text
        caption
        credit
        image {
          id
          alt
          uri
          transformations {
            id
            label
            uri
          }
        }
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
    }
    mediaContacts
  }
`;