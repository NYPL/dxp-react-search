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
  }

  type LocationConnection {
    items: [Location]
    pageInfo: PageInfo
  }

  input LocationFilter {
    libraryType: [String]
  }

  extend type Query {
    allLocations(
      contentType: String
      limit: Int
      pageNumber: Int
      filter: LocationFilter
      sortBy: String
    ): LocationConnection
    location(slug: String): Location
  }
`;
