import gql from "graphql-tag";

export const homePageTypeDefs = gql`
  type HomePage {
    id: ID!
    title: String!
    description: String
    publishDate: String
    unpublishDate: String
    sectionTwo: SectionTwo
    sectionThree: SectionThree
    sectionFour: SectionFour
    sectionFive: SectionFive
    sectionSix: SectionSix
    sectionSeven: SectionSeven
    sectionEight: SectionEight
  }

  union SectionTwo = HomePageSpotlightComponent | HomePageCardGridComponent
  union SectionThree = HomePageEventsComponent | HomePageCardGridComponent
  union SectionFour = HomePageCardGridComponent | HomePageEventsComponent
  union SectionFive = HomePageStaffPicksComponent
  union SectionSix = HomePageSlideshowComponent
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

  type HomePageStaffPicksComponent {
    id: ID!
    type: String
    heading: String
    link: String
    seeMore: SeeMore
    items: [HomePageStaffPicksItemComponent]
  }

  type HomePageSlideshowComponent {
    id: ID!
    type: String
    heading: String
    link: String
    seeMore: SeeMore
    items: [HomePageSlideshowItem]
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

  type HomePageStaffPicksItemComponent {
    id: ID!
    quote: String
    staffName: String
    staffLocation: String
    url: String
    image: Image
  }

  type HomePageSlideshowItem {
    id: ID!
    title: String
    image: Image
    author: String
    audience: String
    genre: String
    url: String
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
