import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    shortDescription: String
    description: String
    startDate: String!
    endDate: String!
    featuredImage: String
    locationName: String
    audience: [EventFilter]
    eventTypes: [EventFilter]
  }

  type EventFilter {
    id: ID!
    name: String
  }

  type EventConnection {
    items: [Event]
    pageInfo: PageInfo
  }

  extend type Query {
    eventCollection(limit: Int, pageNumber: Int, sort: Sort): EventConnection
    event(id: String): Event
    eventFilterCollection(resourceType: String): [EventFilter]
  }
`;
