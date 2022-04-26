import { gql } from "@apollo/client";

export const EVENT_FIELDS_FRAGMENT = gql`
  fragment EventFields on Event {
    id
    title
    shortDescription
    description
    startDate
    endDate
    featuredImage
    locationName
    audience {
      id
      name
    }
    eventTypes {
      id
      name
    }
    customQuestions {
      id
      label
      formType
      required
      options
    }
  }
`;
