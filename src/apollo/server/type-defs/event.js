import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String
    location: String
    locationDetail: String
    date: String
    image: Image
    tags: [String]
    localistUrl: String
    ticketPrice: String
    isFree: Boolean
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
  }
`;
