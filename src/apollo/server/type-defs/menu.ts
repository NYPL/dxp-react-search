import gql from "graphql-tag";

export const menuTypeDefs = gql`
  type MenuItem {
    id: ID!
    label: String!
    url: String!
    parentId: String
    children: [MenuItem]
  }
  type MenuItemsConnection {
    items: [MenuItem]
    # pageInfo: PageInfo
  }
  input MenuFilter {
    maxDepth: QueryFilterItemString
    parent: QueryFilterItemString
    # Added for testing purposes - might not be useful in the end
    title: QueryFilterItemString
  }
  extend type Query {
    menu(
      id: String
      filter: QueryFilter
      # @TODO remove sort if we agree that it does not work.
      sort: Sort
    ): MenuItemsConnection
  }
`;
