import sortByDistance from './sortByDistance';

describe('sortByDistance', () => {
  //beforeEach(() => jest.clearAllMocks());

  const locations = [
    {
      name: "125th Street Library",
      slug: "125th-street",
      geolocation: {
        type: "Point",
        coordinates: [
          -73.9350089,
          40.8030055
        ]
      }
    },
    {
      name: "Stavros Niarchos Foundation Library",
      slug: "snfl",
      geolocation: {
        type: "Point",
        coordinates: [
          -73.98170549999999,
          40.8030055
        ]
      }
    },
    {
      name: "Stephen A. Schwarzman Building",
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

  test('Search for SASB geocords should return SASB.', () => {
    // SASB
    const origin = {
      'originLat': 40.7534887,
      'originLng': -73.9808774
    };

    const result = sortByDistance(origin, locations, 'Stephen A. Schwarzman Building');
    expect(result[0].slug).toEqual('sasb');
  });

  test('Search for SNFL geocords should return SNFL.', () => {
    // SNFL
    const origin2 = {
      'originLat': 40.7518863,
      'originLng': -73.98170549999999
    };

    const result = sortByDistance(origin2, locations, 'Stavros Niarchos Foundation');
    expect(result[0].slug).toEqual('snfl');
  });
});
