//import { MockedProvider } from '@apollo/react-testing';
import { MyMockedProvider } from './../../../../testHelper/MyMockedProvider';

// The component AND the query need to be exported
import LocationsEasy from './LocationsEasy';
import { LocationsQuery as LOCATIONS_QUERY } from './LocationsEasy.gql';

//import { render } from './../../../../testHelper/customRtlRender';

import { render, cleanup } from '@testing-library/react';

/*const LOCATIONS_QUERY = gql`
  query test {
    allLocations {
      locations {
        id
        name
        status
        address_line1
        address_line2
        locality
        administrative_area
        postal_code
        phone
        wheelchairAccess
        geoLocation {
          lat
          lng
        }
      }
    }
  }
`;
*/

const mocks = [
  {
    request: {
      query: LOCATIONS_QUERY,
      /*variables: {
        name: 'Buck',
      },
      */
    },
    result: {
      "data": {
        "allLocations": {
          "locations": [
            {
              "id": "125th-street",
              "name": "125th Street Library",
              "status": "125th-street",
              "address_line1": "224 East 125th Street",
              "address_line2": "224 East 125th Street",
              "locality": "New York",
              "administrative_area": "NY",
              "postal_code": "10035",
              "phone": "(212) 534-5050",
              "wheelchairAccess": "partial",
              "geoLocation": {
                "lat": 40.8034,
                "lng": -73.9354
              }
            },
            {
              "id": "53rd-street",
              "name": "53rd Street Library",
              "status": "53rd-street",
              "address_line1": "18 West 53rd Street",
              "address_line2": "18 West 53rd Street",
              "locality": "New York",
              "administrative_area": "NY",
              "postal_code": "10019",
              "phone": "(212) 714-8400",
              "wheelchairAccess": "full",
              "geoLocation": {
                "lat": 40.7608,
                "lng": -73.9773
              }
            },
          ],
        },
      },
    },
  },
];

it('renders without error', () => {
  render(
    <MyMockedProvider mocks={mocks} addTypename={false}>
      <LocationsEasy />
    </MyMockedProvider>,
  );
});
