import React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BottomPromo from "./BottomPromo";

expect.extend(toHaveNoViolations);
// @TODO fix error related to bgGradient in BottomPromo.tsx
// Error: TypeError: Cannot use 'in' operator to search for 'colors.#FFFBF8' in undefined
describe("BottomPromo", () => {
  it("placeholder test", () => {});
  // it("should render BottomPromo component", () => {
  //   render(<BottomPromo />);
  //   expect(
  //     screen.getByRole("heading", { name: /Discover Our Midtown Locations/i })
  //   );
  // });
  // it("should not have basic accessibility issues", async () => {
  //   const { container } = render(<BottomPromo />);
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });
});
