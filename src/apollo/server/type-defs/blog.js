import gql from "graphql-tag";

export const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    description: String
    slug: String!
  }

  type BlogConnection {
    items: [Blog]
    pageInfo: PageInfo
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
    ): BlogConnection
    blog(slug: String): Blog
  }
`;
