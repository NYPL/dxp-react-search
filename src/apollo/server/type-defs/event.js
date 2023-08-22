import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    slug: String
    description: String
    location: String
    locationDetail: String
    locationId: Int
    address: String
    image: Image
    tags: [String]
    date: String
    needsRegistration: Boolean
    experience: String
    ticketPrice: String
    localistUrl: String
  }

  input EventFilter {
    start: QueryFilterItemString
    end: QueryFilterItemString
  }

  type EventConnection {
    items: [Event]
    pageInfo: PageInfo
  }

  extend type Query {
    allEvents(limit: Int, pageNumber: Int, filter: EventFilter): EventConnection
    event(id: String): Event
  }
`;
