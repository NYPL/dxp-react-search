import gql from "graphql-tag";

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
    language: String
    accessibleFrom: [String]
    resourceUrl: String
    resourceUrls: OnlineResourceUrl
    accessLocations: [AccessLocation]
    subjects: [Subject]
    authenticationType: String
    isCoreResource: Boolean
    isFreeResource: Boolean
    availabilityStatus: String
  }

  type OnlineResourceUrl {
    main: String
    onsite: String
    offsite: String
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
    q: String
    tid: String
    alpha: String
    subjects: [String]
    audience_by_age: [String]
    availability: [String]
  }

  extend type Query {
    allSearchDocuments(
      limit: Int
      offset: Int
      pageNumber: Int
      filter: SearchDocumentFilter
    ): SearchConnection
    searchDocument(id: String): SearchDocument
  }
`;
