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
          -73.9354,
          40.8034
        ]
      }
    },
    {
      name: "Stavros Niarchos Foundation Library",
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
      name: "Stephen A. Schwarzman Building",
      slug: "sasb",
      geolocation: {
        type: "Point",
        coordinates: [
          -73.9808774,
          40.7534887
        ]
      }
    },
    {
      name: "DeWitt Wallace Periodical Room",
      slug: "periodicals-room",
      geolocation: {
        type: "Point",
        coordinates: [
          -73.9808774,
          40.7534887
        ]
      }
    }
  ];

  test('Search for SASB should return SASB first.', () => {
    // SASB
    const origin = {
      'originLat': 40.7534887,
      'originLng': -73.9808774
    };

    const result = sortByDistance(origin, locations, 'Stephen A. Schwarzman Building');
    expect(result[0].slug).toEqual('sasb');
  });

  test('Search for SNFL should return SNFL before SASB.', () => {
    // SNFL
    const origin = {
      'originLat': 40.7518863,
      'originLng': -73.98170549999999
    };

    const result = sortByDistance(origin, locations, 'Stavros Niarchos Foundation');
    expect(result[0].slug).toEqual('snfl');
  });

  test('Search for Dewitt should return Dewitt before SASB.', () => {
    // Dewitt/SASB
    const origin = {
      'originLat': 40.7534887,
      'originLng': -73.9808774
    };

    const result = sortByDistance(origin, locations, 'Dewitt');
    expect(result[0].slug).toEqual('periodicals-room');
  });
});
