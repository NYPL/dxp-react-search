import gql from 'graphql-tag';

export const typeDefs = gql`
  type ResourceTopic {
    id: ID!
    tid: String
    name: String!
    description: String
    imageUrl: String
    url: String
  }

  type OnlineResource {
    id: ID!
    name: String!
    description: String
    slug: String
  }

  input OnlineResourceFilter {
    mostPopular: Boolean
  }

  extend type Query {
    allResourceTopics: [ResourceTopic]!
    resourceTopic(slug: String): ResourceTopic
    allOnlineResources(
      limit: Int,
      filter: OnlineResourceFilter
    ): [OnlineResource]!
    onlineResource(slug: String): OnlineResource
  }
`;