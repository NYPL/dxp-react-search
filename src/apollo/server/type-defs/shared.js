import gql from 'graphql-tag';

export const typeDefs = gql`
  type PageInfo {
    totalItems: Int,
    limit: Int,
    pageNumber: Int,
    pageCount: Int,
    timestamp: String,
    clientIp: String
  }

  type Query {
    _empty: String
  }
`;