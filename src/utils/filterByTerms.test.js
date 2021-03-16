import filterByTerms from './filterByTerms';

const filterGroupsMock = [
  {
    id: "filter-borough",
    terms: ["bronx", "statenisland"],
    operator: "OR"
  },
  {
    id: "filter-accessibility",
    terms: ["partialaccess"],
    operator: "OR"
  },
  {
    id: "filter-amenities",
    terms: ["abcd", "1234"],
    operator: "AND"
  }
];

const locationsMock = [
  {
    name: "Library 1",
    terms: [
      {
        uuid: "filter-borough",
        name: "Borough",
        terms: [
          {
            uuid: "statenisland",
            name: "Staten Island"
          }
        ]
      },
      {
        uuid: "filter-accessibility",
        name: "Accessibility",
        terms: [
          {
            uuid: "partialaccess",
            name: "Partial Access"
          }
        ]
      }
    ]
  },
  {
    name: "Library 2",
    terms: [
      {
        uuid: "filter-borough",
        name: "Borough",
        terms: [
          {
            uuid: "bronx",
            name: "Bronx"
          }
        ]
      },
      {
        uuid: "filter-accessibility",
        name: "Accessibility",
        terms: [
          {
            uuid: "partialaccess",
            name: "Partial Access"
          }
        ]
      },
      {
        uuid: "filter-amenities",
        name: "Amenities",
        terms: [
          {
            uuid: "abcd",
            name: "abcd"
          },
          {
            uuid: "1234",
            name: "1234"
          }
        ]
      }
    ]
  }
];

describe('filterByTerms', () => {
  test('Filters should only return 1 matching location.', () => {
    expect(
      filterByTerms(locationsMock, filterGroupsMock)
    ).toHaveLength(1);
  });
});