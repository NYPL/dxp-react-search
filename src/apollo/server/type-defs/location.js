import gql from "graphql-tag";

export const typeDefs = gql`
  type Location {
    id: ID!
    name: String!
    contentType: String!
    slug: String!
    internalSlug: String
    url: String!
    libraryType: String!
    parentLibraryName: String
    address: Address
    phone: String
    email: String
  }

  type Address {
    addressLine1: String
    addressLine2: String
    locality: String
    administrativeArea: String
    postalCode: String
  }

  type LocationConnection {
    items: [Location]
    pageInfo: PageInfo
    responseInfo: ResponseInfo!
  }

  input LocationFilter {
    libraryType: QueryFilterItemArray
    internalSlug: QueryFilterItemArray
  }

  extend type Query {
    allLocations(
      contentType: String
      limit: Int
      pageNumber: Int
      filter: LocationFilter
      sort: Sort
    ): LocationConnection
    location(slug: String): Location
  }
`;
