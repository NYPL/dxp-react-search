import gql from "graphql-tag";

export const typeDefs = gql`
  type FilterItem {
    id: ID!
    name: String!
    children: [FilterItem]
    drupalInternalId: String
  }

  type FilterItemLegacy {
    id: ID!
    name: String!
    children: [FilterItemLegacy]
    drupalInternalId: String
  }

  input FilterQueryFilter {
    limiter: QueryFilterItemString
  }

  extend type Query {
    allFiltersByGroupId(
      id: String
      type: String
      limit: Int
      pageNumber: Int
      filter: FilterQueryFilter
      sort: Sort
    ): [FilterItem]
    allFiltersByGroupIdLegacy(
      id: String
      type: String
      limiter: String
    ): [FilterItemLegacy]
  }
`;
