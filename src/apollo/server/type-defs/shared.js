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
    allOnlineResources: [OnlineResource]!
    allOnlineResourcesSearch(
      limit: Int,
      offset: Int,
      pageNumber: Int,
      filter: SearchFilter
    ): SearchConnection
  }
`;