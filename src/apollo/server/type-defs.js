import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Location {
    id: ID!
    name: String!
    status: String!
    address_line1: String
    address_line2: String
    locality: String
    administrative_area: String
    postal_code: String
    phone: String
  }

  type Query {
    viewer: User
    allLocations(filter: String): [Location]!
  }
`
