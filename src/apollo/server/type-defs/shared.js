import gql from 'graphql-tag';

export const typeDefs = gql`
  type PageInfo {
    totalItems: Int,
    limit: Int,
    pageNumber: Int,
    pageCount: Int,
    timestamp: String
  }

  type Query {
    allLocations(
      limit: Int,
      offset: Int,
      pageNumber: Int,
      filter: Filter,
      sortByDistance: SortByDistance
    ): LocationsConnection
    allTerms(filter: TermsFilter): [Vocab]!
    allResourceTopics: [ResourceTopic]!
    allOnlineResources(
      limit: Int,
      filter: OnlineResourceFilter
    ): [OnlineResource]!
    onlineResource(slug: String): OnlineResource
    allSearchDocuments(
      limit: Int,
      offset: Int,
      pageNumber: Int,
      filter: SearchDocumentFilter
    ): SearchConnection
  }
`;