import { MockedProvider } from '@apollo/client/testing';
import { cleanup, screen, waitFor } from "@testing-library/react";
import { render } from './../../../../testHelper/customRtlRender';
import '@testing-library/jest-dom/extend-expect';
import { GraphQLError } from 'graphql';
import LocationsEasy from './LocationsEasy';
//import { LocationsQuery as LOCATIONS_QUERY } from './LocationsEasy.gql';
import { LocationsQuery as LOCATIONS_QUERY } from './Locations.gql';
// Mock data
import allLocations from './../../../../testHelper/__mocks/allLocations';

const mocks = [
  {
    request: {
      query: LOCATIONS_QUERY,
      variables: {
        searchGeoLat: null,
        searchGeoLng: null,
        openNow: true,
        limit: 10,
        offset: 0,
        pageNumber: 1,
      },
    },
    result: allLocations
  },
];

afterEach(cleanup);

describe('Apollo states test', () => {
  // Test loading
  it('renders loading state without error', () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationsEasy />
      </MockedProvider>
    );

    // Check for loading skeleton class
    expect(container.getElementsByClassName('loading-skeleton').length).toBe(1);
    //screen.debug(container);
  });

  // Error state
  it('renders error state', async () => {
    const errorMocks = [
      {
        request: {
          query: LOCATIONS_QUERY
        },
        result: {
          errors: [new GraphQLError('Error!')],
        },
      },
    ];

    const { container } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <LocationsEasy />
      </MockedProvider>
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
    // Check for error message
    expect(screen.getByText(/error while loading locations/)).toBeInTheDocument();
    //screen.debug(container);
  });

  // Final state
  it('renders final state without errors', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationsEasy />
      </MockedProvider>
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
    // Check for data
    expect(screen.getByText(/125th Street Library/)).toBeInTheDocument();
    expect(screen.getByText(/53rd Street Library/)).toBeInTheDocument();
    //screen.debug(container);
  });

});
