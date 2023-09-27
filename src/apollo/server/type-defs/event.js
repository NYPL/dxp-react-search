import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    slug: String
    eventTypes: [EventFilterItem]
    eventSeries: [EventFilterItem]
    eventTopics: [EventFilterItem]
    eventAudience: EventFilterItem
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
    localistEventUrl: String
  }

  type EventConnection {
    items: [Event]
    pageInfo: PageInfo
  }

  type EventFilterTerm {
    id: ID!
    label: String
    items: [EventFilterItem]
  }

  type EventFilterItem {
    id: ID!
    name: String
  }

  # Filters
  type LocalistFilterItem {
    id: ID!
    name: String!
  }

  input EventFilter {
    event_type: QueryFilterItemArray
    event_series: QueryFilterItemArray
    event_topics: QueryFilterItemArray
    event_audience: QueryFilterItemArray
    location: QueryFilterItemArray
    q: String
  }

  extend type Query {
    eventCollection(limit: Int, pageNumber: Int): EventConnection
    event(id: String): Event
    eventFilterCollection(limit: Int, pageNumber: Int): [EventFilterTerm]
    eventCollectionSearch(
      limit: Int
      pageNumber: Int
      filter: EventFilter
    ): EventConnection
    #
    localistFilterCollection(id: String!, type: String!): [LocalistFilterItem]
  }
`;
