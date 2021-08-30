import gql from "graphql-tag";

export const typeDefs = gql`
  type OnlineResource {
    id: ID!
    name: String!
    description: String
    slug: String
  }

  input OnlineResourceFilter {
    mostPopular: Boolean
  }

  type OnlineResourceConnection {
    items: [OnlineResource]
    pageInfo: PageInfo
  }

  extend type Query {
    allOnlineResources(
      limit: Int
      filter: OnlineResourceFilter
    ): OnlineResourceConnection
    onlineResource(slug: String): OnlineResource
  }
`;
