import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    slug: String
    eventType: EventType
    description: String
    location: String
    locationDetail: String
    locationId: Int
    address: String
    image: Image
    tags: [String]
    date: String
    time: String
    needsRegistration: Boolean
    experience: String
    ticketPrice: String
    localistUrl: String
  }

  type EventType {
    id: ID!
    name: String
  }

  type EventConnection {
    items: [Event]
    pageInfo: PageInfo
  }

  extend type Query {
    allEvents(limit: Int, pageNumber: Int): EventConnection
    event(id: String): Event
  }
`;
