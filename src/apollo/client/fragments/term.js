import { gql } from "@apollo/client";

export const TERM_BASE_FIELDS_FRAGMENT = gql`
  fragment TermBaseFields on Term {
    id
    tid
    name
    description
  }
`;
