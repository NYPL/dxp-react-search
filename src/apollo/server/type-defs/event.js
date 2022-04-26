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
    audience: [EventFilterItem]
    eventTypes: [EventFilterItem]
    customQuestions: [EventCustomQuestion]
  }

  type EventCustomQuestion {
    id: ID!
    label: String!
    formType: String!
    required: Boolean
    options: [String]
  }

  type EventFilterItem {
    id: ID!
    name: String
  }

  input EventFilter {
    q: String
    audiences: [String]
    eventTypes: [String]
  }

  type EventConnection {
    items: [Event]
    pageInfo: PageInfo
  }

  extend type Query {
    eventCollection(
      limit: Int
      pageNumber: Int
      sort: Sort
      filter: EventFilter
    ): EventConnection
    event(id: String): Event
    eventFilterCollection(resourceType: String): [EventFilterItem]
  }
`;
