import { MockedProvider } from "@apollo/client/testing";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { render } from "./../../../../testHelper/customRtlRender";
import "@testing-library/jest-dom/extend-expect";
import { GraphQLError } from "graphql";
import Locations from "./Locations";
import { LocationsQuery as LOCATIONS_QUERY } from "./../../../apollo/client/queries/Locations.gql";
// Mock data
import allLocations from "./../../../../testHelper/__mocks/allLocations";
// Axe
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

const mocks = [
  {
    request: {
      query: LOCATIONS_QUERY,
      variables: {
        searchGeoLat: null,
        searchGeoLng: null,
        searchQuery: "",
        openNow: true,
        limit: 300,
        offset: 0,
        pageNumber: 1,
        termIds: [],
      },
    },
    result: allLocations,
  },
];

const search = {
  searchQuery: "",
  searchQueryGeoLat: null,
  searchQueryGeoLng: null,
  openNow: true,
  limit: 300,
  offset: 0,
  pageNumber: 1,
  pageCount: 1,
  searchFilters: [],
};

afterEach(cleanup);

describe("Apollo states test", () => {
  // Test loading
  it("renders loading state without error", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Locations />
      </MockedProvider>
    );

    // Check for loading skeleton class
    expect(container.getElementsByClassName("skeleton-loader").length).toBe(1);
  });

  // Error state
  it("renders error state", async () => {
    const errorMocks = [
      {
        request: {
          query: LOCATIONS_QUERY,
          variables: {
            searchGeoLat: null,
            searchGeoLng: null,
            searchQuery: "",
            openNow: true,
            limit: 300,
            offset: 0,
            pageNumber: 1,
            termIds: [],
          },
        },
        result: {
          errors: [new GraphQLError("Error!")],
        },
      },
    ];

    const { container } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Locations />
      </MockedProvider>,
      { initialState: { search } }
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
    // Check for error message
    expect(
      screen.getByText(/error while loading locations/)
    ).toBeInTheDocument();
  });

  // Final state
  it("renders final state without errors", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Locations />
      </MockedProvider>,
      { initialState: { search } }
    );

    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 4)));
    // Check for data
    expect(screen.getByText(/125th Street Library/)).toBeInTheDocument();
    expect(screen.getByText(/53rd Street Library/)).toBeInTheDocument();
  });

  // Accessbiility tests.
  it("should not have basic accessibility issues", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Locations />
      </MockedProvider>,
      { initialState: { search } }
    );
    // Wait for content
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
