import gql from 'graphql-tag';

export const typeDefs = gql`
  type Location {
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
    geoLocation: GeoLocation
    todayHours: TodayHours
    appointmentOnly: Boolean
    open: Boolean
    terms: [String]
  }

  type GeoLocation {
    lat: Float
    lng: Float
  }

  type TodayHours {
    start: String
    end: String
  }

  input SortByDistance {
    originLat: Float
    originLng: Float
    searchQuery: String
  }

  input Filter {
    openNow: Boolean
    termIds: [TermsFilter]
  }

  type LocationsConnection {
    locations: [Location]
    pageInfo: PageInfo
  }

  extend type Query {
    allLocations(
      limit: Int,
      offset: Int,
      pageNumber: Int,
      filter: Filter,
      sortByDistance: SortByDistance
    ): LocationsConnection
  }
`;