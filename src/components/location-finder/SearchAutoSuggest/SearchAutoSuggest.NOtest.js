import { MockedProvider } from '@apollo/client/testing';
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from './../../../../testHelper/customRtlRender';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
// Gql
import { GraphQLError } from 'graphql';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchAutoSuggest.gql';
// Mock data
import allLocations from './../../../../testHelper/__mocks/allLocations';
// Component
import SearchAutoSuggest from './SearchAutoSuggest';

// Axe
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const mocks = [
  {
    request: {
      query: LOCATIONS_QUERY
    },
    result: { 
      data: { 
        allLocations: { 
          locations: [
            {
              id: 'test',
              name: 'test',
              locality: 'Beverly Hills',
              postal_code: '90210'
            },
            {
              id: 'test2',
              name: 'test2',
              locality: 'Beverly Hills',
              postal_code: '90210'
            }
          ] 
        } 
      } 
    }
  },
];

const search = {
  searchQuery: '',
  searchQueryGeoLat: null,
  searchQueryGeoLng: null,
  openNow: true,
  limit: 300,
  offset: 0,
  pageNumber: 1
}

afterEach(cleanup);

describe('Search AutoSuggest', () => {
  /*it('search input triggers autosuggest bottom text', async () => {
  });
  */

  it('search input triggers autosuggest suggestions', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchAutoSuggest />
      </MockedProvider>
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    // Search input
    const searchInput = container.querySelector('input[name="search-locations"]');
    
    await waitFor(() => {
      //userEvent.focus(searchInput);
      //userEvent.type(searchInput, 'lib {space}');
      fireEvent.change(searchInput, {
        target: {
          value: 'lib'
        }
      })
      //searchInput.focus();
      new Promise((resolve) => setTimeout(resolve,10));
    });

    expect(searchInput.value).toBe('lib');
    screen.debug(container);

    //expect(searchInput.value).toBe('lib');
    //screen.debug(container);

    
    // Wait for autosuggest promise to resolve?
    //await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    //screen.debug(container);
  });
  
});
