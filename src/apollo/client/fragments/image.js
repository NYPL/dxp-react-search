import { gql } from "@apollo/client";

export const IMAGE_FIELDS_FRAGMENT = gql`
  fragment ImageFields on Term {
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
`;
