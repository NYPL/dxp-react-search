const allLocations = {
  data: {
    refineryAllLocations: {
      locations: [
        {
          id: "125th-street",
          name: "125th Street Library",
          contentType: "library",
          status: "125th-street",
          parentLibraryName: null,
          slug: "125th-street",
          url: "https://www.nypl.org/locations/125th-street",
          address_line1: "224 East 125th Street",
          address_line2: "224 East 125th Street",
          locality: "New York",
          administrative_area: "NY",
          postal_code: "10035",
          phone: "(212) 534-5050",
          wheelchairAccess: "partial",
          accessibilityNote: "",
          todayHours: {
            start: "11:00",
            end: "18:00",
          },
          appointmentOnly: false,
          open: true,
          geoLocation: {
            lat: 40.8034,
            lng: -73.9354,
          },
          terms: [],
        },
        {
          id: "53rd-street",
          name: "53rd Street Library",
          status: "53rd-street",
          parentLibraryName: null,
          slug: "53rd-street",
          contentType: "library",
          url: "https://www.nypl.org/locations/53rd-street",
          address_line1: "18 West 53rd Street",
          address_line2: "18 West 53rd Street",
          locality: "New York",
          administrative_area: "NY",
          postal_code: "10019",
          phone: "(212) 714-8400",
          wheelchairAccess: "full",
          accessibilityNote: "",
          todayHours: {
            start: "11:00",
            end: "19:00",
          },
          appointmentOnly: false,
          open: true,
          geoLocation: {
            lat: 40.7608,
            lng: -73.9773,
          },
          terms: [],
        },
      ],
      pageInfo: {
        totalItems: 2,
        timestamp: "12345",
      },
    },
  },
};

export { allLocations as default };
