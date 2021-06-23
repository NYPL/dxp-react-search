import gql from 'graphql-tag';

export const typeDefs = gql`
  type LocationMatch {
    id: ID!
    name: String
  }

  type LocationMatchConnection {
    items: [LocationMatch]
    pageInfo: PageInfo
  }

  extend type Query {
    allLocationMatches(ip: String): LocationMatchConnection
  }
`;