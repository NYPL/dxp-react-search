import gql from "graphql-tag";

export const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String
    startDate: String!
    endDate: String!
    featuredImage: String
  }

  type EventConnection {
    items: [Event]
    pageInfo: PageInfo
  }

  extend type Query {
    eventCollection(limit: Int, pageNumber: Int, sort: Sort): EventConnection
    event(id: String): Event
  }
`;
