import gql from 'graphql-tag';

export const typeDefs = gql`
  interface SearchDocument {
    id: ID!
    slug: String!
    name: String!
    description: String
  }

  type OnlineResourceDocument implements SearchDocument {
    id: ID!
    slug: String!
    name: String!
    description: String
    mostPopular: String
    accessibilityLink: String
    termsConditionsLink: String
    privacyPolicyLink: String
    notes: String
    updateFrequency: String
    printEquivalent: String
    format: String
    language: String
    outputType: String
    accessibleFrom: [String]
    resourceUrl: String
    accessLocations: [AccessLocation]
    subjects: [Subject]
    isCoreResource: Boolean
  }

  type AccessLocation {
    id: ID!
    name: String
    slug: String
    url: String
    drupalInternalValue: String
  }

  type Subject {
    id: ID!
    name: String
  }

  type SearchConnection {
    items: [SearchDocument]
    pageInfo: PageInfo
  }

  input SearchDocumentFilter {
    q: String,
    tid: String,
    alpha: String
    subjects: [String]
    audience_by_age: [String]
  }

  extend type Query {
    allSearchDocuments(
      limit: Int,
      offset: Int,
      pageNumber: Int,
      filter: SearchDocumentFilter
    ): SearchConnection
    searchDocument(id: String): SearchDocument
  }  
`;