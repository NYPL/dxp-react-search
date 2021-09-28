import gql from "graphql-tag";

export const typeDefs = gql`
  type RefineryLocation {
    id: ID!
    name: String!
    contentType: String!
    slug: String!
    url: String!
    status: String!
    parentLibraryName: String
    address_line1: String
    address_line2: String
    locality: String
    administrative_area: String
    postal_code: String
    phone: String
    wheelchairAccess: String
    accessibilityNote: String
    geoLocation: RefineryGeoLocation
    todayHours: RefineryTodayHours
    appointmentOnly: Boolean
    open: Boolean
    terms: [String]
  }

  type RefineryAddress {
    address_line1: String
    address_line2: String
    locality: String
    administrative_area: String
    postal_code: String
  }

  type RefineryGeoLocation {
    lat: Float
    lng: Float
  }

  type RefineryTodayHours {
    start: String
    end: String
  }

  input RefinerySortByDistance {
    originLat: Float
    originLng: Float
    searchQuery: String
  }

  input RefineryFilter {
    openNow: Boolean
    termIds: [RefineryTermsFilter]
  }

  type RefineryLocationsConnection {
    locations: [RefineryLocation]
    pageInfo: PageInfo
  }

  extend type Query {
    refineryAllLocations(
      limit: Int
      offset: Int
      pageNumber: Int
      filter: RefineryFilter
      sortByDistance: RefinerySortByDistance
    ): RefineryLocationsConnection
  }
`;
