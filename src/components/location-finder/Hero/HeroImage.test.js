import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import HeroImage from "./HeroImage";

expect.extend(toHaveNoViolations);

describe("HeroImage", () => {
  test("renders HeroImage component", () => {
    render(<HeroImage />);
  });
});

it("should not have basic accessibility issues", async () => {
  const { container } = render(<HeroImage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
