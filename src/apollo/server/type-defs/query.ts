import gql from "graphql-tag";

export const queryTypeDefs = gql`
  type PageInfo {
    totalItems: Int
    limit: Int
    pageNumber: Int
    pageCount: Int
    timestamp: String
    clientIp: String
  }

  input Sort {
    field: String
    direction: String
  }

  input QueryFilterItemReference {
    fieldName: String!
    operator: String!
    conjunction: String!
    value: [String]!
  }

  input QueryFilterItemBoolean {
    fieldName: String!
    operator: String!
    value: Boolean
  }

  input QueryFilterItemString {
    fieldName: String!
    operator: String!
    value: String
  }

  input QueryFilterItemArray {
    fieldName: String!
    operator: String!
    value: [String]!
  }

  # New QueryFilters pattern.
  input QueryFilter {
    experimental: Boolean
    conjunction: String
    groups: [QueryFilterGroup]
    conditions: [QueryFilterCondition]
  }

  input QueryFilterGroup {
    conjunction: String
    conditions: [QueryFilterCondition]
  }

  input QueryFilterCondition {
    field: String
    operator: String
    value: String
  }

  type Query {
    _empty: String
  }
`;
