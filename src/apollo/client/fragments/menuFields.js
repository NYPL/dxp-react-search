import { gql } from "@apollo/client";

export const MENU_FIELDS_FRAGMENT = gql`
  fragment MenuFields on MenuItem {
    id
    title
    url
    parentId
  }
`;
