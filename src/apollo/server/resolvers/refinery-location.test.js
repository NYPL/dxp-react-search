import locations from "../../../../testHelper/__mocks/refineryLocationsMock";
// Mock filterByOpenNow
import filterByOpenNow from "../../../utils/filterByOpenNow";
jest.mock("./../../../utils/filterByOpenNow", () => jest.fn());
// Mock filterByTerms
import filterByTerms from "../../../utils/filterByTerms";
jest.mock("./../../../utils/filterByTerms", () => jest.fn());
// Mock sortByDistance
import sortByDistance from "../../../utils/sortByDistance";
jest.mock("./../../../utils/sortByDistance", () => jest.fn());
// Resolver
import { refineryLocationResolver } from "./refinery-location";

describe("refineryLocationResolver", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockContext = {
    dataSources: {
      refineryApi: {
        getAllLocations: () => locations,
      },
    },
  };

  test("Location resolver calls default only.", async () => {
    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: false,
          termIds: [],
        },
        sortByDistance: {
          originLat: null,
          originLng: null,
        },
      },
      mockContext
    );
    expect(filterByOpenNow.mock.calls.length).toBe(0);
    expect(filterByTerms.mock.calls.length).toBe(0);
    expect(sortByDistance.mock.calls.length).toBe(0);
  });

  test("Location resolver calls openNow only.", async () => {
    filterByOpenNow.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: true,
          termIds: [],
        },
        sortByDistance: {
          originLat: null,
          originLng: null,
        },
      },
      mockContext
    );

    expect(filterByOpenNow.mock.calls.length).toBe(1);
    expect(filterByTerms.mock.calls.length).toBe(0);
    expect(sortByDistance.mock.calls.length).toBe(0);
  });

  test("Location resolver calls filterByTerms only.", async () => {
    // Set return value to be all locations in mock, since we're only testing
    // the logic of whether the filters are called or not.
    filterByTerms.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: false,
          termIds: [
            {
              id: "filter-borough",
              terms: ["bronx", "statenisland"],
              operator: "OR",
            },
          ],
        },
        sortByDistance: {
          originLat: null,
          originLng: null,
        },
      },
      mockContext
    );

    expect(filterByTerms.mock.calls.length).toBe(1);
    expect(filterByOpenNow.mock.calls.length).toBe(0);
    expect(sortByDistance.mock.calls.length).toBe(0);
  });

  test("Location resolver calls sortByDistance only.", async () => {
    sortByDistance.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: false,
          termIds: [],
        },
        sortByDistance: {
          originLat: 40.45,
          originLng: -50.56,
        },
      },
      mockContext
    );

    expect(sortByDistance.mock.calls.length).toBe(1);
    expect(filterByOpenNow.mock.calls.length).toBe(0);
    expect(filterByTerms.mock.calls.length).toBe(0);
  });

  test("Location resolver calls openNow and filterByTerms only.", async () => {
    filterByOpenNow.mockReturnValue(locations);
    filterByTerms.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: true,
          termIds: [
            {
              id: "filter-borough",
              terms: ["bronx", "statenisland"],
              operator: "OR",
            },
          ],
        },
        sortByDistance: {
          originLat: null,
          originLng: null,
        },
      },
      mockContext
    );

    expect(filterByOpenNow.mock.calls.length).toBe(1);
    expect(filterByTerms.mock.calls.length).toBe(1);
    expect(sortByDistance.mock.calls.length).toBe(0);
  });

  test("Location resolver calls openNow and sortByDistance only.", async () => {
    filterByOpenNow.mockReturnValue(locations);
    sortByDistance.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: true,
          termIds: [],
        },
        sortByDistance: {
          originLat: 40.45454,
          originLng: -79.99999,
        },
      },
      mockContext
    );

    expect(filterByOpenNow.mock.calls.length).toBe(1);
    expect(filterByTerms.mock.calls.length).toBe(0);
    expect(sortByDistance.mock.calls.length).toBe(1);
  });

  test("Location resolver calls filterByTerms and sortByDistance only.", async () => {
    filterByTerms.mockReturnValue(locations);
    sortByDistance.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: false,
          termIds: [
            {
              id: "filter-borough",
              terms: ["bronx", "statenisland"],
              operator: "OR",
            },
          ],
        },
        sortByDistance: {
          originLat: 40.45454,
          originLng: -79.99999,
        },
      },
      mockContext
    );

    expect(filterByTerms.mock.calls.length).toBe(1);
    expect(sortByDistance.mock.calls.length).toBe(1);
    expect(filterByOpenNow.mock.calls.length).toBe(0);
  });

  test("Location resolver calls all: openNow, filterByTerms, sortByDistance.", async () => {
    filterByOpenNow.mockReturnValue(locations);
    filterByTerms.mockReturnValue(locations);
    sortByDistance.mockReturnValue(locations);

    const result = await refineryLocationResolver.Query.refineryAllLocations(
      (parent = null),
      // args
      {
        filter: {
          openNow: true,
          termIds: [
            {
              id: "filter-borough",
              terms: ["bronx", "statenisland"],
              operator: "OR",
            },
          ],
        },
        sortByDistance: {
          originLat: 40.45,
          originLng: -50.56,
        },
      },
      mockContext
    );

    expect(filterByOpenNow.mock.calls.length).toBe(1);
    expect(filterByTerms.mock.calls.length).toBe(1);
    expect(sortByDistance.mock.calls.length).toBe(1);
  });
});
