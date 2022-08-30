import gql from "graphql-tag";

export const typeDefs = gql`
  type HomePage {
    id: ID!
    title: String!
    description: String
    publishDate: String
    unpublishDate: String
    sectionOne: [SectionOne]
    sectionTwo: [SectionTwo]
    sectionThree: [SectionThree]
    sectionFour: [SectionFour]
    sectionFive: [SectionFive]
    sectionSeven: [SectionSeven]
    sectionEight: [SectionEight]
  }

  union SectionOne = HomePageHeroComponent
  union SectionTwo = HomePageSpotlightComponent | HomePageCardGridComponent
  union SectionThree = HomePageEventsComponent | HomePageCardGridComponent
  union SectionFour = HomePageCardGridComponent | HomePageEventsComponent
  union SectionFive = HomePageStaffpicksComponent
  union SectionSeven = HomePageCardGridComponent
  union SectionEight = HomePageCardGridComponent

  # Home page content components (Drupal paragraphs).
  type HomePageHeroComponent {
    id: ID!
    type: String
    heading: String
    description: String
    image: Image
    link: String
    tag: String
  }

  type HomePageEventsComponent {
    id: ID!
    type: String
    heading: String
    link: String
    seeMore: SeeMore
  }

  type HomePageSpotlightComponent {
    id: ID!
    type: String
    heading: String
    link: String
    seeMore: SeeMore
    gridVariant: String
  }

  type HomePageStaffpicksComponent {
    id: ID!
    type: String
    heading: String
    link: String
    seeMore: SeeMore
    items: [HomePageStaffpicksCardComponent]
  }

  type HomePageCardGridComponent {
    id: ID!
    type: String
    heading: String
    link: String
    seeMore: SeeMore
    gridVariant: String
    items: [HomePageCardComponent]
  }

  type SeeMore {
    link: String
    text: String
  }

  type HomePageCardComponent {
    id: ID!
    title: String
    description: String
    url: String
    image: Image
  }

  type HomePageStaffpicksCardComponent {
    id: ID!
    quote: String
    staff_name: String
    staff_location: String
    url: String
    image: Image
  }

  # Home page content types.
  # Event
  type HomePageEvent {
    id: ID!
    title: String!
    image: Image
    link: String
    category: String
    location: String!
    displayDate: String
    publishOn: String
    unpublishOn: String
    published: Boolean
    weight: Int
  }

  type HomePageEventConnection {
    items: [HomePageEvent]
    pageInfo: PageInfo
  }

  # Hero
  type HomePageHero {
    id: ID!
    type: String
    heading: String
    description: String
    image: Image
    link: String
    tag: String
    publishOn: String
    unpublishOn: String
    published: Boolean
  }

  type HomePageHeroConnection {
    items: [HomePageHero]
    pageInfo: PageInfo
  }

  # Spotlight
  type HomePageSpotlightItem {
    id: ID!
    type: String
    title: String
    image: Image
    url: String
  }

  type HomePageSpotlightItemConnection {
    items: [HomePageSpotlightItem]
    pageInfo: PageInfo
  }

  extend type Query {
    homePage(id: String, revisionId: String, preview: Boolean): HomePage
    homePageHeroCollection(
      limit: Int
      filter: QueryFilter
      preview: Boolean
    ): HomePageHeroConnection
    homePageSpotlightCollection(
      limit: Int
      filter: QueryFilter
      sort: Sort
      preview: Boolean
    ): HomePageSpotlightItemConnection
    homePageEventCollection(
      limit: Int
      filter: QueryFilter
      sort: Sort
      preview: Boolean
    ): HomePageEventConnection
  }
`;
