import filterByTerms from './filterByTerms';

const filterGroupsMock = [
  {
    id: "filter-boroughs",
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
        id: "filter-boroughs",
        name: "Borough",
        terms: [
          {
            id: "statenisland",
            name: "Staten Island"
          }
        ]
      },
      {
        id: "filter-accessibility",
        name: "Accessibility",
        terms: [
          {
            id: "partialaccess",
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
        id: "filter-boroughs",
        name: "Borough",
        terms: [
          {
            id: "bronx",
            name: "Bronx"
          }
        ]
      },
      {
        id: "filter-accessibility",
        name: "Accessibility",
        terms: [
          {
            id: "partialaccess",
            name: "Partial Access"
          }
        ]
      },
      {
        id: "filter-amenities",
        name: "Amenities",
        terms: [
          {
            id: "abcd",
            name: "abcd"
          },
          {
            id: "1234",
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