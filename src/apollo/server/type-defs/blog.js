import gql from "graphql-tag";

export const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    description: String
    slug: String!
    date: String!
    image: Image
    locations: [Location]
  }

  type BlogConnection {
    items: [Blog]
    pageInfo: PageInfo
  }

  type Location {
    id: ID!
    name: String!
    contentType: String!
    slug: String!
    url: String!
    status: String!
  }

  input BlogFilter {
    featured: Boolean
  }

  extend type Query {
    allBlogs(
      contentType: String
      limit: Int
      pageNumber: Int
      filter: BlogFilter
      sortBy: String
    ): BlogConnection
    blog(slug: String): Blog
  }
`;
