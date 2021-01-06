import resolvers from './';

describe('location resolver', () => {
  // allLocations no args
  // allLocations filter openNow only
  // allLocations sortByDistance only
  // allLocations filter: openNow and sortByDistance

  test('yo', async () => {
    const result = resolvers.locationResolver.Query.allLocations(
    );
  });
});