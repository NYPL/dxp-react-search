import gql from "graphql-tag";

export const blogTypeDefs = gql`
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
      AudioEmbed
    | BlogCardGrid
    | GoogleMapEmbed
    | ImageComponent
    | SocialEmbed
    | Text
    | TextWithImage
    | Video

  type BlogConnection {
    items: [Blog]
    pageInfo: PageInfo
  }

  type BlogLocation {
    id: ID!
    name: String!
    contentType: String!
    drupalInternalId: String!
    slug: String!
  }

  type BlogCardGrid {
    id: ID!
    type: String!
    title: String
    description: String
    items: [BlogCardGridItem]!
  }

  type BlogCardGridItem {
    id: ID!
    title: String
    description: String
    image: Image
    link: String
  }

  input BlogFilter {
    featured: QueryFilterItemBoolean
    status: QueryFilterItemBoolean
    channels: QueryFilterItemReference
    subjects: QueryFilterItemReference
    libraries: QueryFilterItemReference
    divisions: QueryFilterItemReference
    audiences: QueryFilterItemReference
  }

  extend type Query {
    allBlogs(
      limit: Int
      pageNumber: Int
      filter: BlogFilter
      sort: Sort
    ): BlogConnection
    blog(id: String, revisionId: String, preview: Boolean): Blog
  }
`;
