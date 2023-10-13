import gql from "graphql-tag";

export const PageTypeDefs = gql`
  type Page {
    id: ID!
    title: String!
    description: String
    image: Image
    # breadcrumbs: [BreadcrumbsItem]
    mainContent: [PageMainContent]
  }

  union PageMainContent =
      CardGrid
    | Text
    | Video
    | ImageComponent
    | TextWithImage
    | ButtonLinks

  type PageConnection {
    items: [Page]
    pageInfo: PageInfo
  }

  extend type Query {
    pageCollection(limit: Int, pageNumber: Int, sort: Sort): PageConnection
    page(id: String, revisionId: String, preview: Boolean): Page
  }
`;
