import { graphql } from 'graphql';
import { schema } from './../schema';
import locations from './../../../../testHelper/__mocks/refineryLocationsMock';

describe('location resolver', () => {
  // allLocations no args
  // allLocations filter openNow only
  // allLocations sortByDistance only
  // allLocations filter: openNow and sortByDistance

  test('allLocations no args', async () => {
    /*const query = `
      query {
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

    const query = `
      query($openNow: Boolean) {
        allLocations(
          filter: {
            openNow: $openNow
          }
        ) {
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

    const mockContext = { 
      dataSources: { 
        refineryApi: {
          getAllLocations: () => locations
        }
      } 
    };

    /*const variables = {
      filter: {
        openNow: true,
      },
    };
    */

    const params = { openNow: false };

    const result = await graphql(
      schema, 
      query, 
      undefined,
      mockContext,
      params
    );
    
    console.log(result);
    console.log(result.data.allLocations);
    
  });


});