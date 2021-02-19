import gql from 'graphql-tag';

export const typeDefs = gql`
  type Location {
    id: ID!
    name: String!
    contentType: String!
    slug: String!
    url: String!
    status: String!
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
  }

  input Filter {
    openNow: Boolean
    termIds: [TermsFilter]
  }

  type PageInfo {
    totalItems: Int
  }

  type LocationsConnection {
    locations: [Location]
    pageInfo: PageInfo
  }

  type Vocab {
    id: ID!
    name: String!
    terms: [Term]
  }

  type Term {
    id: ID!
    name: String!
  }

  input TermsFilter {
    id: String!
    terms: [String]!
    operator: String!
  }

  type Query {
    allLocations(
      limit: Int,
      offset: Int,
      pageNumber: Int,
      filter: Filter,
      sortByDistance: SortByDistance
    ): LocationsConnection
    allTerms(filter: TermsFilter): [Vocab]!
  }
`;
