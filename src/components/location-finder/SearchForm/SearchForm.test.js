import { MockedProvider } from '@apollo/client/testing';
import { cleanup, screen, waitFor } from "@testing-library/react";
import { render } from './../../../../testHelper/customRtlRender';
import '@testing-library/jest-dom/extend-expect';
// Gql
import { GraphQLError } from 'graphql';
import { LocationsQuery as LOCATIONS_QUERY } from './SearchForm.gql';
// Mock data
import allLocations from './../../../../testHelper/__mocks/allLocations';
// Component
import SearchForm from './SearchForm';

// Axe
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const mocks = [
  {
    request: {
      query: LOCATIONS_QUERY,
      variables: {
        searchGeoLat: null,
        searchGeoLng: null,
        openNow: true,
        limit: 300,
        offset: 0,
        pageNumber: 1,
      },
    },
    result: allLocations
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



describe('Apollo states test', () => {
  // Test loading
  /*it('renders loading state without error', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Locations />
      </MockedProvider>
    );

    // Check for loading skeleton class
    expect(container.getElementsByClassName('loading-skeleton').length).toBe(1);
  });
  */

  // Accessbiility tests.
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchForm />
      </MockedProvider>
    );
    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    screen.debug(container);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

});
