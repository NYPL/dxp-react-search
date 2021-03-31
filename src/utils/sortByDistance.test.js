import sortByDistance from './sortByDistance';

describe('sortByDistance', () => {
  test('Search for SASB geocords should return SASB.', () => {
    // SASB
    const origin = {
      'originLat': 40.7534887,
      'originLng': -73.9808774
    };

    const locations = [
      {
        slug: "125th-street",
        geolocation: {
          type: "Point",
          coordinates: [
            -73.9354,
            40.8034
          ]
        }
      },
      {
        slug: "snfl",
        geolocation: {
          type: "Point",
          coordinates: [
            -73.9818,
            40.752
          ]
        }
      },
      {
        slug: "sasb",
        geolocation: {
          type: "Point",
          coordinates: [
            -73.9808774,
            40.7534887
          ]
        }
      }
    ];

    const result = sortByDistance(origin, locations);
    expect(result[0].slug).toEqual('sasb');
  });

  
});
