import { gql } from "@apollo/client";

export const PRESS_FIELDS_FRAGMENT = gql`
  fragment PressFields on PressRelease {
    id
    title
    subTitle
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
          width
          height
          transformations {
            id
            label
            uri
          }
        }
        imageAlignment
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
