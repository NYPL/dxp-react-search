import gql from "graphql-tag";

export const typeDefs = gql`
  type FilterItem {
    id: ID!
    name: String!
    children: [FilterItem]
    drupalInternalId: String
  }

  extend type Query {
    allFiltersByGroupId(id: String, type: String, limiter: String): [FilterItem]
  }
`;
