import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom/extend-expect";
expect.extend(toHaveNoViolations);
// Component
import DonorCredit from "./DonorCredit";
import renderer from "react-test-renderer";

describe("DonorCredit tests", () => {
  it("should pass axe accessibility test", async () => {
    const { container } = render(
      <DonorCredit
        showBorder={true}
        description="Test Description"
        id="Test ID"
        heading="Test Heading"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("should render the UI snapshot correctly", () => {
    const defaultDonorCredit = renderer
      .create(
        <DonorCredit
          showBorder={true}
          description="Test Description"
          id="Test ID"
          heading="Test Heading"
        />
      )
      .toJSON();

    const donorCreditWithoutBorder = renderer
      .create(
        <DonorCredit
          showBorder={false}
          description="Test Description"
          id="Test ID"
          heading="Test Heading"
        />
      )
      .toJSON();

    const donorCreditWithoutHeading = renderer
      .create(
        <DonorCredit
          showBorder={false}
          description="Test Description"
          id="Test ID"
        />
      )
      .toJSON();

    expect(defaultDonorCredit).toMatchSnapshot();
    expect(donorCreditWithoutBorder).toMatchSnapshot();
    expect(donorCreditWithoutHeading).toMatchSnapshot();
  });

  it("should render no heading element when heading is empty or all spaces", () => {
    const { rerender } = render(
      <DonorCredit
        showBorder={true}
        description="Test Description"
        id="Test ID"
        heading="   "
      />
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();

    rerender(
      <DonorCredit
        showBorder={true}
        description="Test Description"
        id="Test ID"
        heading=""
      />
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
