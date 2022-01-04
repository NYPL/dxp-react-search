import gql from "graphql-tag";

export const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    description: String
    slug: String!
    date: String!
    byline: String!
    image: Image
    locations: [BlogLocation]
    mainContent: [BlogMainContent]
  }

  union BlogMainContent =
      TextWithImage
    | Video
    | Slideshow
    | Text
    | SocialEmbed
    | AudioEmbed
    | GoogleMapEmbed
    | ImageComponent
    | CardList

  type BlogConnection {
    items: [Blog]
    pageInfo: PageInfo
  }

  type BlogLocation {
    id: ID!
    name: String!
    contentType: String!
    slug: String!
    url: String!
    status: String!
  }

  input BlogFilter {
    featured: Boolean
    channels: [String]
    subjects: [String]
    libraries: [String]
    divisions: [String]
    audiences: [String]
  }

  extend type Query {
    allBlogs(
      limit: Int
      pageNumber: Int
      filter: BlogFilter
      sortBy: String
    ): BlogConnection
    blog(id: String): Blog
  }
`;
