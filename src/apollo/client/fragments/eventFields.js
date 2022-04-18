import { gql } from "@apollo/client";

export const EVENT_FIELDS_FRAGMENT = gql`
  fragment EventFields on Event {
    id
    title
    description
    startDate
    endDate
    featuredImage
    locationName
  }
`;
