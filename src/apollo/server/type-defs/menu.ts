import gql from "graphql-tag";

export const MenuTypeDefs = gql`
  type MenuItem {
    id: ID!
    title: String!
    url: String!
    children: [MenuItem]
  }

  type MenuItemsConnection {
    items: [MenuItem]
    # pageInfo: PageInfo
  }

  extend type Query {
    menuCollection(id: String, limit: Int, sort: Sort): MenuItemsConnection!
  }
`;
