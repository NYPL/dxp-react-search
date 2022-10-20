import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Donation from "./Donation";

const mockNextJsImage = {
  id: "test-id-1",
  alt: "image-1-alt-text",
  layout: "responsive",
  width: 400,
  height: 200,
  quality: 90,
  uri: "https://placeimg.com/400/200/arch",
  useTransformation: false,
  transformationLabel: "2_1_960",
};

describe("Donation component tests", () => {
  beforeEach(() => {
    render(
      <Donation
        id="test-id"
        title="Donate to NYPL"
        description="Donation description"
        image={mockNextJsImage}
        donationFormBaseUrl="https://test.com?id=1"
        defaultAmount="145"
        donationOtherLevelId="1234"
      />
    );
  });

  it("should render the provided heading.", () => {
    expect(
      screen.getByRole("heading", {
        name: /donate to nypl/i,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  // it("should render the provided description.", () => {});

  it("should prepopulate donation input field with default amount.", () => {
    expect(
      screen.getByRole("textbox", {
        name: /ways to donate/i,
      })
    ).toHaveValue("145");
  });

  it("should generate single donation link using default amount", () => {
    expect(
      screen.getByRole("link", {
        name: /single donation/i,
      })
    ).toHaveAttribute(
      "href",
      "https://test.com?id=1&set.DonationLevel=1234&set.Value=14500"
    );
  });

  it("should generate monthly donation link using default amount", () => {
    expect(
      screen.getByRole("link", {
        name: /monthly donation/i,
      })
    ).toHaveAttribute(
      "href",
      "https://test.com?id=1&set.DonationLevel=1234&set.Value=14500&set.OptionalRepeat=TRUE"
    );
  });
});
