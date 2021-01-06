import { MockedProvider } from '@apollo/client/testing';
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
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



describe('Search Form', () => {
  it('renders form with input, submit button, and open now checkbox', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchForm />
      </MockedProvider>
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
    
    // Search input
    const searchInput = container.querySelector('input[name="search"]');
    expect(searchInput).toBeInTheDocument();

    // Form submit button
    const searchSubmit = container.querySelector('button[type="submit"]');
    expect(searchSubmit).toBeInTheDocument();

    // Open now checkbox
    const openNowCheckbox = container.querySelector('input[name="isOpenNow"]');
    expect(openNowCheckbox).toBeInTheDocument();
    expect(screen.getByLabelText('Open Now')).toBeInTheDocument();
  });
   
  it('open now checkbox can be toggled checked/unchecked', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchForm />
      </MockedProvider>
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    const openNowCheckbox = container.querySelector('input[name="isOpenNow"]');
    // Check
    await waitFor(() => {
      fireEvent.click(openNowCheckbox);
    });
    expect(openNowCheckbox.checked).toEqual(true);
    // Uncheck
    await waitFor(() => {
      fireEvent.click(openNowCheckbox);
    });
    expect(openNowCheckbox.checked).toEqual(false);
  });

  // Accessbiility tests.
  // @TODO Not working!
  /*
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
  */
});
