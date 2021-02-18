import locations from './../../../../testHelper/__mocks/refineryLocationsMock';
// Mock filterByTerms
import filterByTerms from './../../../utils/filterByTerms';
jest.mock('./../../../utils/filterByTerms', () => jest.fn());
// Mock filterByOpenNow
import filterByOpenNow from './../../../utils/filterByOpenNow';
jest.mock('./../../../utils/filterByOpenNow', () => jest.fn());
//
import locationResolver from './locationResolver';

describe('locationResolver', () => {
  // allLocations no args
  // allLocations filter openNow only
  // allLocations sortByDistance only
  // allLocations filter: openNow and sortByDistance

  const mockContext = { 
    dataSources: { 
      refineryApi: {
        getAllLocations: () => locations
      }
    } 
  };

  test('Location resolver runs default', async () => {
    const result = await locationResolver.Query.allLocations(
      null, 
      {
        filter: {
          openNow: false,
          termIds: []
        }
      }, 
      mockContext
    );
    expect(filterByOpenNow.mock.calls.length).toBe(0);
    expect(filterByTerms.mock.calls.length).toBe(0);
  });

  test('Location resolver runs openNow if args are provided.', async () => {
    filterByOpenNow.mockReturnValue(locations);

    const result = await locationResolver.Query.allLocations(
      null, 
      {
        filter: {
          openNow: true,
          termIds: []
        }
      }, 
      mockContext
    );

    expect(filterByOpenNow.mock.calls.length).toBe(1);
    expect(filterByTerms.mock.calls.length).toBe(0);
  });

  test('Location resolver runs filterByTerms only.', async () => {
    // Set return value to be all locations in mock, since we're only testing
    // the logic of whether the filters are called or not.
    filterByTerms.mockReturnValue(locations);

    const result = await locationResolver.Query.allLocations(
      parent = null, 
      // args
      {
        filter: {
          openNow: false,
          termIds: [
            {
              id: "filter-borough",
              terms: ["bronx", "statenisland"],
              operator: "OR"
            }
          ]
        }
      }, 
      mockContext
    );

    expect(filterByTerms.mock.calls.length).toBe(1);
    //expect(filterByOpenNow.mock.calls.length).toBe(0);
  });
});