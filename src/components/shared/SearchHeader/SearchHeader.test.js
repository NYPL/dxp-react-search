import React from "react";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "./../../../../testHelper/customRtlRender";
import SearchHeader from "./SearchHeader";

expect.extend(toHaveNoViolations);

const mocks = [];

describe("SearchHeader", () => {
  test("renders SearchHeader component", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader />
      </MockedProvider>
    );
  });

  test("SearchHeader component should have title", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader id={"location-finder__title"} title="Location Finder">
          <form role="search">
            <input type="text" name="search" />
          </form>
        </SearchHeader>
      </MockedProvider>
    );
    expect(
      container.querySelector("#location-finder__title")
    ).toBeInTheDocument();
  });

  test("SearchHeader component should have a search form", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader>
          <form role="search">
            <input type="text" name="search" />
          </form>
        </SearchHeader>
      </MockedProvider>
    );
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  // Accessbiility tests.
  test("should not have basic accessibility issues", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchHeader id={"location-finder__title"} title="Location Finder" />
      </MockedProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
