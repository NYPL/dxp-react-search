import React from "react";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
import { render } from "./../../../../testHelper/customRtlRender";
import LocationsPagination from "./LocationsPagination";

expect.extend(toHaveNoViolations);

// Mock Data
const search = {
  pageCount: 12,
  pageNumber: 7,
};

describe("LocationsPagination", () => {
  test("renders LocationPagination component", () => {
    render(<LocationsPagination limit={10} />, { initialState: { search } });
  });
});

describe("LocationsPagination", () => {
  test("selected page item should be set to 7", () => {
    render(<LocationsPagination limit={10} />, {
      initialState: { search },
    });
    const links = screen.getAllByRole("link");
    const page7 = links[3].getAttribute("aria-current");
    expect(page7).toEqual("page");
  });
});

/*describe("LocationsPagination", () => {
  test("total number of page items should be 12", () => {
    render(<LocationsPagination limit={10} />, {
      initialState: { search },
    });

    const links = screen.getAllByRole("link");
    screen.debug(links);
    expect(links).toHaveLength(7);

    // With pageCount of 12, pagination should look like this....
    // Prev 1 ... 5 6 7 8 9 ... 12 Next
    //const lastItem = container.querySelectorAll("li")[9].textContent;
    //expect(lastItem).toBe("12");
  });
});
*/

// Accessibility tests.
it("should not have basic accessibility issues", async () => {
  const { container } = render(<LocationsPagination />, {
    initialState: { search },
  });

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
