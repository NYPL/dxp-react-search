import gql from "graphql-tag";

export const MenuTypeDefs = gql`
  type MenuItem {
    id: ID!
    title: String!
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
    menuCollection(
      id: String
      filter: MenuFilter
      # @TODO remove sort if porven it does not work
      sort: Sort
    ): MenuItemsConnection
  }
`;
